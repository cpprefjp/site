# swap
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void swap(jthread& x) noexcept;
```

## 概要
別の`jthread`と交換する。


## 効果
`*this`と`x`を入れ替える。


## 例外
送出しない。


## 例
```cpp example
#include <thread>

int main()
{
  std::jthread t1([]{ /*...*/ });
  std::jthread t2;

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
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
