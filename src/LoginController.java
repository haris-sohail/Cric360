import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class LoginController extends JFrame{
    private JPanel panelMain;
    private JTextField txtUsername;
    public static String loggedInUserName;
    private JPasswordField txtPassword;
    private JButton btnLogin;
    private JButton btnSignUp;

    public LoginController() {
        btnLogin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleLogin();
            }
        });
        btnSignUp.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                SignUpController newSignUp = new SignUpController();
                newSignUp.setContentPane(newSignUp.getPanelMain());
                newSignUp.setSize(400,400);
                newSignUp.setLocationRelativeTo(null);
                newSignUp.setVisible(true);
                newSignUp.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
    }

    public void handleLogin(){
        String username = txtUsername.getText();
        char[] password = txtPassword.getPassword();

        String userType = checkCredentials(username, new String((password)));
        // Check from database
        if(userType != null){
            loggedInUserName = txtUsername.getText();
            JOptionPane.showMessageDialog(panelMain, "Login successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
            // set text fields to blank
            txtUsername.setText("");
            txtPassword.setText("");

            // based on the user show the main menu
            UserOperations userOp = new UserOperations(userType);
            userOp.userMainScreen();
            dispose();
        }
        else{
            JOptionPane.showMessageDialog(panelMain, "Login failed!", "Error", JOptionPane.ERROR_MESSAGE);
            // set text fields to blank
            txtUsername.setText("");
            txtPassword.setText("");
        }
    }

    public String checkCredentials(String username, String password){
        try{
            String query = "SELECT type FROM User$ WHERE username = '" + username + "' AND password = '" + password + "'";

            Connection conn = DriverManager.getConnection(Main.connectionString);
            PreparedStatement stmt = conn.prepareStatement(query);

            try (ResultSet resultSet = stmt.executeQuery()) {
                if (resultSet.next()) {
                    // Extract the "type" column value and store it in a String
                    String userType = resultSet.getString("type");

//                    dispose();
                    return userType;
                } else {
                    return null; // User not found
                }
            }
        }
       catch (Exception e){
            System.out.println("Connection Error");
            return null;
       }
    }

    public JPanel getPanelMain() {
        return panelMain;
    }

}
