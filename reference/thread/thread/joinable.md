# joinable
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool joinable() const noexcept;
```

## 概要
`thread`オブジェクトがスレッドと関連付けられているか否か取得する。


## 戻り値
スレッドと関連付けられているなら`true`を、そうでなければ`false`を返す。


## 例外
送出しない。


## 例
```cpp example
#include <cassert>
#include <thread>

int main()
{
  std::thread t([]{ /*...*/ });
  assert(t.joinable());

  t.join();
  assert(!t.joinable());
  return 0;
}
```
* joinable()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 参照
