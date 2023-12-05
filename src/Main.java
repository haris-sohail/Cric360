import javax.swing.*;

public class Main {
    public static String connectionString;

    public static void handleSignup(){
        SignUpController newSignUp = new SignUpController();
        newSignUp.setContentPane(newSignUp.getPanelMain());
        newSignUp.setSize(400,400);
        newSignUp.setLocationRelativeTo(null);
        newSignUp.setVisible(true);
        newSignUp.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void setConnectionString(){
        connectionString = "jdbc:sqlserver://DESKTOP-2BV11P4\\SQLEXPRESS:50143;Database=Cric360;IntegratedSecurity=true;encrypt=false";

    }

    public static void main(String[] args) {
        setConnectionString();
        handleSignup();
    }

}
