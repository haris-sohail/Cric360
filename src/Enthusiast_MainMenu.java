import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Enthusiast_MainMenu extends JFrame{
    private JButton btnSeeRequests;
    private JPanel panelMain;
    private JButton viewStatsButton;

    public Enthusiast_MainMenu() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                SetMatchNotifications setmatchnotifications = new SetMatchNotifications();
                setmatchnotifications.setContentPane(setmatchnotifications.getPanelMain());
                setmatchnotifications.setSize(400, 400);
                setmatchnotifications.setLocationRelativeTo(null);
                setmatchnotifications.setVisible(true);
                setmatchnotifications.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }
        });
        viewStatsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Set Match Notifications");
                ViewStats viewstats = new ViewStats();
                viewstats.setContentPane(viewstats.getPanelMain());
                viewstats.setSize(400, 400);
                viewstats.setLocationRelativeTo(null);
                viewstats.setVisible(true);
                viewstats.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }
        });
    }

    public JPanel getPanelMain() {return panelMain;}



}
