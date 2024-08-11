# assign_range
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<charT> R>
constexpr basic_string& assign_range(R&& rg); // C++23
```

## 概要
Rangeの各要素を再代入する。


## 効果
`return ` [`assign`](assign.md)`(basic_string(`[`from_range`](../../ranges/from_range_t.md)`, `[`forward`](../../utility/forward.md)`<R>(rg), `[`get_allocator()`](get_allocator.md)`));`


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "str";
  const char a[3] = {'i', 'n', 'g'};

  // Rangeを再代入
  s.assign_range(a);

  std::cout << s << std::endl;
}
```
* assign_range[color ff0000]

### 出力
```
ing
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`assign`](assign.md)                     | コンテナの再代入        |
