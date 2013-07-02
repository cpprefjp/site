#call_once(C++11)
```cpp
namespace std {
  template <class Callable, class ...Args>
  void call_once(once_flag& flag, Callable func, Args&&... args);
}
```
* once_flag[link /reference/mutex/once_flag.md]


##概要
指定された関数を一度だけ呼び出す。 
この関数は主に、スレッド間で共通使用するデータの初期化に使用する。


##効果
パラメータ`flag`が初期状態であれば、`func`関数オブジェクトに`args...`を適用して呼び出し、そうでなければ`func`関数オブジェクトを呼び出さない。 
`func`関数オブジェクトの呼び出しが例外を送出する場合、その例外は`call_once()`関数の呼び出し元に伝達され、パラメータ`flag`は初期状態のままとなる。


##戻り値
なし


##例外
この関数は、`func`関数オブジェクトの呼び出しによって送出される、あらゆる例外が送出される可能性がある。 
そのほかに、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- [`invalid_argument`](/reference/system_error/errc.md) ： `flag`が無効状態


##備考
`func`関数オブジェクトの呼び出しが例外を送出した場合、同じパラメータ`flag`を指定した次の`call_once`にて関数オブジェクトが呼び出される。また、同じパラメータ`flag`を指定した複数`call_once()`において、指定された各関数オブジェクトの呼び出しは同時に行われない。（全順序が保証される）


##例
```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::once_flag once;

void init()
{
  // 初期化を行う...
  std::cout << "initialize" << std::endl;
}

void thread_proc()
{
  std::call_once(once, init);
}

int main()
{
  std::thread t1(thread_proc);
  std::thread t2(thread_proc);
  std::thread t3(thread_proc);

  t1.join();
  t2.join();
  t3.join();
}
```
* call_once[color ff0000]


###出力
```
initialize
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


