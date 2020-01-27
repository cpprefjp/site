# rbegin
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reverse_iterator rbegin() const noexcept;
```

## 概要
先�要素を指す逆順イテレータを取得する。


## 戻り値
以下と�価：

```cpp
return reverse_iterator(end());
```
* end()[link end.md]


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // vの先�3要素を部分シーケンスとして参照する
  std::span<int, 3> s = std::span(v).first(3);

  // 逆順に出力
  std::for_each(s.rbegin(), s.rend(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* rbegin[color ff0000]
* s.rend()[link rend.md]
* first[link first.md]

### 出力
```
3
2
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
