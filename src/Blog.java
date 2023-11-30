import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
public class Blog extends JFrame{

    private JPanel panelMain;
    private JLabel label1;
    private JLabel label2;

    private JTextField textField1;
    private JTextArea textArea1;
    private JButton submitButton;

    public JPanel getPanelMain(){
        return panelMain;
    }
    public Blog() {

        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        });
    }



}
