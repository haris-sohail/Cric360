import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SignUpController extends JFrame{
    private JPanel panelMain;
    private JComboBox comboGender;
    private JComboBox comboType;
    private JButton btnSignUp;
    private JButton btnCancel;
    private JTextField txtFirstName;
    private JTextField txtLastName;
    private JTextField txtDOB;
    private JTextField txtUsename;
    private JPasswordField txtPassword;
    private JButton btnLogin;
    private JButton playerButton;
    private JButton matchOfficialButton;
    private JButton enthusiastButton;

    // get panel main
    public JPanel getPanelMain() {
        return panelMain;
    }
    public SignUpController() {
        btnSignUp.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleSignUp();
            }
        });
        btnCancel.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose();
            }
        });
        btnLogin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                LoginController loginForm = new LoginController();

                loginForm.setContentPane(loginForm.getPanelMain());
                Dimension parentSize = getSize();
                loginForm.setSize(parentSize);
                loginForm.setLocationRelativeTo(null);
                loginForm.setVisible(true);
                loginForm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                dispose();
            }
        });
    }

    private void handleSignUp() {
        // Get values from text fields
        String firstName = txtFirstName.getText();
        String lastName = txtLastName.getText();
        String dob = txtDOB.getText();
        String username = txtUsename.getText();
        char[] password = txtPassword.getPassword();
        String gender = (String) comboGender.getSelectedItem();
        String type = (String) comboType.getSelectedItem();

        // Check if any field is empty
        if (firstName.isEmpty() || lastName.isEmpty() || dob.isEmpty() || username.isEmpty() || password.length == 0) {
            JOptionPane.showMessageDialog(panelMain, "All fields must be filled out", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // output all the fields in terminal make a function

        outputFields(firstName, lastName, dob, username, new String(password), gender, type);

        // Database addition and object creation

        if(addUser(type, firstName, lastName, dob, username, new String(password), gender)){
            // Display success message
            JOptionPane.showMessageDialog(panelMain, "Registration successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
        }
        else{
            JOptionPane.showMessageDialog(panelMain, "Registration failed!", "Error", JOptionPane.ERROR_MESSAGE);
        }

        // Clear the fields after successful registration
        clearFields();
    }

    private void outputFields(String firstName, String lastName, String dob, String username, String password, String gender, String type) {
        System.out.println("First Name: " + firstName);
        System.out.println("Last Name: " + lastName);
        System.out.println("Date of Birth: " + dob);
        System.out.println("Username: " + username);
        System.out.println("Password: " + new String(password));
        System.out.println("Gender: " + gender);
        System.out.println("Type: " + type);
    }
    private void clearFields() {
        txtFirstName.setText("");
        txtLastName.setText("");
        txtDOB.setText("");
        txtUsename.setText("");
        txtPassword.setText("");
    }

    private boolean addUser(String type, String firstName, String lastName, String dob, String username, String password, String gender) {
        if (type.equals("Player")) {
            Player player = new Player(firstName, lastName, username, password, dob, gender);
            return player.addToDatabase();
        }

        else if(type.equals("Enthusiast")){
            Enthusiast enthusiast = new Enthusiast(firstName, lastName, username, password, dob, gender);
            return enthusiast.addToDatabase();
        }

        else if (type.equals(("Match Official"))){
            MatchOfficial matchOfficial = new MatchOfficial(firstName, lastName, username, password, dob, gender);
            return matchOfficial.addToDatabase();
        }
        return true;
    }
}
