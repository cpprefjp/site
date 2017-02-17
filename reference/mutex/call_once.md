#call_once
* mutex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Callable, class ...Args>
  void call_once(once_flag& flag, Callable func, Args&&... args);
}
```
* once_flag[link /reference/mutex/once_flag.md]


##概要
指定された関数を一度だけ呼び出す。

この関数は主に、複数スレッド間で共通使用するデータの初期化処理などで使用する。


##効果
パラメータ`flag`が初期状態であれば、`func`関数オブジェクトに`args...`を適用して呼び出し、そうでなければ`func`関数オブジェクトを呼び出さない。

`func`関数オブジェクトの呼び出しが例外を送出する場合、その例外は`call_once()`関数の呼び出し元に伝達され、パラメータ`flag`は初期状態のままとなる。


##戻り値
なし


##例外
- システムのAPIで何らかのエラーが発生した場合、[`system_error`](/reference/system_error/system_error.md)例外が送出される。
- `func`関数オブジェクトの呼び出しによって送出される、あらゆる例外が送出される可能性がある。


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
* std::call_once[color ff0000]
* std::once_flag[link once_flag.md]

###出力
```
initialize
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##参照
- [LWG Issue 2080. Specify when `once_flag` becomes invalid](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2080)
    - C++11では、`once_flag`が無効(invalid)な場合に`system_error`が送出される仕様になっていた。実際には、`once_flag`が無効になる状況はないため、C++14でこの例外仕様が削除された。

