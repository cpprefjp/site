# size
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
size_type size() const;                    // (1) C++03
size_type size() const noexcept;           // (1) C++11
constexpr size_type size() const noexcept; // (1) C++20
```

## 概要
コンテナの要素数を取得する。


## 戻り値
`vector`オブジェクトに含まれる要素数を返す。


## 例外
投げない


## 計算量
定数時間


## 備考
`a.size()` と [`distance`](/reference/iterator/distance.md)`(a.`[`begin`](begin.md)`(), a.`[`end`](end.md)`())` は同じ結果になる。


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  std::size_t size = v.size();
  std::cout << size << std::endl;
}
```
* size()[color ff0000]

### 出力
```
5
```


## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
