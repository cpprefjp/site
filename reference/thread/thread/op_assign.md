#operator= (C++11)
```cpp
// コピー
thread& operator=(const thread&) = delete;

// ムーブ
thread& operator=(thread&& x) noexcept;
```
* コピー[italic]
* ムーブ[italic]

##概要
`thread`オブジェクトはムーブ代入可能／コピー代入不可。


##効果
ムーブ代入演算子呼び出し時点で`this`にスレッドが関連付けられている場合、[`std::terminate()`](/reference/exception/terminate.md)を呼び出してプログラムを異常終了する。そうでなければ`x`から`this`へのムーブ代入を行う。


##事後条件
ムーブ前に`x`と関連付けられていたスレッドは`this`に関連付けられる。ムーブ後の`x`は何も指さない空の`thread`オブジェクトとなる。


##戻り値
`*this`を返す。


##例
```cpp
#include <thread>
#include <cassert>

int main()
{
  std::thread th1([]{ /*...*/ });
  std::thread th2;
  assert(th1.joinable() && !th2.joinable());

  // th1からth2へムーブ代入
  th2 = std::move(th1);
  assert(!th1.joinable() && th2.joinable());

  th2.join();
}
```
* th2 = std::move(th1);[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


##参照


