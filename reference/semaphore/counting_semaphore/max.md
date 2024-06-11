# max
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static constexpr ptrdiff_t max() noexcept;
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
カウンティングセマフォが取り扱えるカウンタの最大値


## 戻り値
カウンタの最大値を返す。

カウンタの最大値はテンプレートパラメータ`least_max_value`と等しいか、それ以上の値となる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <semaphore>

int main()
{
  using Semaphore = std::counting_semaphore<10>;
  std::cout << Semaphore::max() << std::endl;

  // 処理系定義のデフォルト値
  std::cout << std::counting_semaphore<>::max() << std::endl;
}
```
* max()[color ff0000]

### 出力例
```
10
2147483647
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
