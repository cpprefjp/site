# insert_range
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<charT> R>
constexpr iterator insert_range(const_iterator pos, R&& rg); // C++23
```

## 概要
Rangeの各要素を任意の位置に挿入する。


## 効果
`return ` [`insert`](insert.md)`(pos, basic_string(`[`from_range`](../../ranges/from_range_t.md)`,` [`forward`](../../utility/forward.md)`<R>(rg),` [`get_allocator()`](get_allocator.md)`));`


## 戻り値
挿入されたRange`rg`の最初の要素を指すイテレータ。`rg`が空の場合は`pos`。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <string>

int main()
{
  std::string s = "str";
  const char a[3] = {'i', 'n', 'g'};

  // Rangeを１番目と２番目の要素の間に挿入
  s.insert_range(std::next(s.begin()), a);

  std::cout << s << std::endl;
}
```
* insert_range[color ff0000]

### 出力
```
singtr
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`insert`](insert.md)                     | 要素の挿入             |
