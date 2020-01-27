# operator=
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// コピー
thread& operator=(const thread&) = delete;

// ムーブ
thread& operator=(thread&& x) noexcept;
```
* コピー[italic]
* ムーブ[italic]

## 概要
`thread`オブジェクトはムーブ代入可能／コピー代入不可。


## 効果
ムーブ代入演算�呼び出し時点で`this`にスレッドが関連付けられている場合、[`std::terminate()`](/reference/exception/terminate.md)を呼び出してプ�グラムを異常終了する。そうでなければ`x`から`this`へのムーブ代入を行う。


## 事後条件
ムーブ前に`x`と関連付けられていたスレッドは`this`に関連付けられる。ムーブ後の`x`は何も指さない空の`thread`オブジェクトとなる。


## 戻り値
`*this`を返す。


## 例
```cpp example
#include <thread>
#include <cassert>

int main()
{
  std::thread t1([]{ /*...*/ });
  std::thread t2;
  assert(t1.joinable() && !t2.joinable());

  // th1からth2へムーブ代入
  t2 = std::move(t1);
  assert(!t1.joinable() && t2.joinable());

  t2.join();
}
```
* th2 = std::move(th1);[color ff0000]
* joinable()[link joinable.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照


