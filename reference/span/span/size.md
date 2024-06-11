# size
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr size_type size() const noexcept;
```

## 概要
参照している要素数を取得する。


## 戻り値
メンバ変数として保持している要素数を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  assert(std::span{v}.size() == 5);
  assert(std::span{v}.first(3).size() == 3);
}
```
* size()[color ff0000]
* first[link first.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
