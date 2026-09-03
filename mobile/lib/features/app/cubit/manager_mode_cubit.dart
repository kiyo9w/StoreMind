import 'package:flutter_bloc/flutter_bloc.dart';

class ManagerModeCubit extends Cubit<bool> {
  ManagerModeCubit() : super(true);

  void setManagerMode(bool isManager) => emit(isManager);
}
