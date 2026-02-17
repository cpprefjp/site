# max_size
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
size_type max_size() const;                    // (1) C++03
size_type max_size() const noexcept;           // (1) C++11
constexpr size_type max_size() const noexcept; // (1) C++26
```

## 概要
`multimap` コンテナが格納できる要素の最大数を返す。 
これは、システムやライブラリ実装の制限のもとでコンテナが格納できる潜在的な最大サイズである。


## 戻り値
`multimap` コンテナが自身のコンテンツとして保持できる要素の最大数。 
メンバ型 `size_type` は符号なし整数型である。


## 計算量
定数時間。


## 例
```cpp example
#include <iostream>
#include <map>

int main ()
{
  std::multimap<char, int> m;

  std::cout << m.max_size() << std::endl;

  return 0;
}
```
* max_size()[color ff0000]

### 出力例
```
178956970
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目
| 名前 | 説明 |
|-----------------------------------------------------------------------------------|--------------------------|
| [`size`](size.md) | 要素数を取得する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
