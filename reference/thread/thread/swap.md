# swap
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(thread& x) noexcept;
```

## 概要
別の`thread`と交換する。


## 効果
`*this`と`x`を入れ替える。


## 例外
送出しない。


## 例
```cpp example
#include <thread>

int main()
{
  std::thread t1([]{ /*...*/ });
  std::thread t2;

  t1.swap(t2);

  t2.join();

  return 0;
}
```
* swap[color ff0000]
* join[link join.md]

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
