import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Captain_MainMenu extends JFrame{
    private JPanel panelMain;
    private JButton btnSeeRequests;

    public Captain_MainMenu() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // create captain request form
                CaptainRequestGUI captainRequestGUI = new CaptainRequestGUI();
                captainRequestGUI.setContentPane(captainRequestGUI.getPanelMain());
                captainRequestGUI.setSize(400, 400);
                captainRequestGUI.setLocationRelativeTo(null);
                captainRequestGUI.setVisible(true);
                captainRequestGUI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();

            }
        });
    }

    public JPanel getPanelMain(){
        return panelMain;
    }
}
