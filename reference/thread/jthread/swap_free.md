# swap (非メンバ関数)
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend void swap(jthread& x, jthread& y) noexcept;
```

## 概要
2つの`jthread`オブジェクトを入れ替える


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <thread>

int main()
{
  std::jthread t1([]{ /*...*/ });
  std::jthread t2;

  swap(t1, t2);

  t2.join();

  return 0;
}
```
* swap[color ff0000]


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
