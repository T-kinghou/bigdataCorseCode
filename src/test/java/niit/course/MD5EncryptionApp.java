package niit.course;

/**
 * @author 侯贻达
 * version 1.0
 */
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

/**
 * MD5加密解密程序
 * 注意：MD5是单向散列函数，理论上不可逆，此程序通过建立映射表实现简单的"解密"功能
 */
public class MD5EncryptionApp extends JFrame {

    private JTextField inputField;
    private JTextField resultField;
    private JButton encryptButton;
    private JButton decryptButton;
    private JButton clearButton;
    private JTextArea logArea;

    // 存储加密过的内容和对应的原文，用于模拟解密
    private Map<String, String> encryptionMap = new HashMap<>();

    public MD5EncryptionApp() {
        // 设置窗口标题和基本属性
        super("MD5加密解密程序");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // 创建组件
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // 输入区域
        JPanel inputPanel = new JPanel(new GridLayout(3, 2, 5, 5));
        inputPanel.setBorder(BorderFactory.createTitledBorder("输入与结果"));

        inputPanel.add(new JLabel("输入文本:"));
        inputField = new JTextField();
        inputPanel.add(inputField);

        inputPanel.add(new JLabel("结果:"));
        resultField = new JTextField();
        resultField.setEditable(false);
        inputPanel.add(resultField);

        // 按钮区域
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 0));
        encryptButton = new JButton("加密");
        decryptButton = new JButton("解密");
        clearButton = new JButton("清除");

        buttonPanel.add(encryptButton);
        buttonPanel.add(decryptButton);
        buttonPanel.add(clearButton);

        inputPanel.add(new JLabel(""));
        inputPanel.add(buttonPanel);

        mainPanel.add(inputPanel, BorderLayout.NORTH);

        // 日志区域
        logArea = new JTextArea();
        logArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(logArea);
        scrollPane.setBorder(BorderFactory.createTitledBorder("操作日志"));
        mainPanel.add(scrollPane, BorderLayout.CENTER);

        // 添加事件监听
        encryptButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String input = inputField.getText().trim();
                if (!input.isEmpty()) {
                    try {
                        String encrypted = md5Encrypt(input);
                        resultField.setText(encrypted);
                        encryptionMap.put(encrypted, input);
                        logArea.append("加密: " + input + " -> " + encrypted + "\n");
                    } catch (Exception ex) {
                        JOptionPane.showMessageDialog(MD5EncryptionApp.this,
                                "加密过程中发生错误: " + ex.getMessage(),
                                "错误", JOptionPane.ERROR_MESSAGE);
                        logArea.append("错误: " + ex.getMessage() + "\n");
                    }
                } else {
                    JOptionPane.showMessageDialog(MD5EncryptionApp.this,
                            "请输入要加密的文本",
                            "提示", JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });

        decryptButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String input = inputField.getText().trim();
                if (!input.isEmpty()) {
                    String decrypted = encryptionMap.get(input);
                    if (decrypted != null) {
                        resultField.setText(decrypted);
                        logArea.append("解密: " + input + " -> " + decrypted + "\n");
                    } else {
                        resultField.setText("无法解密 - 未找到对应的原文");
                        logArea.append("解密失败: 未找到 " + input + " 对应的原文\n");
                    }
                } else {
                    JOptionPane.showMessageDialog(MD5EncryptionApp.this,
                            "请输入要解密的MD5哈希值",
                            "提示", JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });

        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                inputField.setText("");
                resultField.setText("");
                logArea.append("已清除输入和结果\n");
            }
        });

        // 添加主面板到窗口
        add(mainPanel);

        // 显示窗口
        setVisible(true);

        // 初始日志
        logArea.append("程序启动成功，可以开始加密/解密操作\n");
        logArea.append("注意：MD5是单向散列函数，理论上不可逆\n");
        logArea.append("本程序通过记录加密过的内容实现简单的\"解密\"功能\n");
    }

    /**
     * MD5加密方法
     * @param input 需要加密的字符串
     * @return 加密后的32位MD5字符串
     * @throws NoSuchAlgorithmException 如果MD5算法不可用
     */
    private String md5Encrypt(String input) throws NoSuchAlgorithmException {
        // 获取MD5算法实例
        MessageDigest md = MessageDigest.getInstance("MD5");

        // 将输入字符串转换为字节数组并进行哈希计算
        byte[] messageDigest = md.digest(input.getBytes());

        // 将字节数组转换为16进制字符串
        BigInteger number = new BigInteger(1, messageDigest);
        String hashtext = number.toString(16);

        // 补全前导零，确保结果为32位
        while (hashtext.length() < 32) {
            hashtext = "0" + hashtext;
        }

        return hashtext;
    }

    /**
     * 主方法
     */
    public static void main(String[] args) {
        // 使用事件调度线程创建GUI
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new MD5EncryptionApp();
            }
        });
    }
}
