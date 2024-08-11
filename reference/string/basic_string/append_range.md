# append_range
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<charT> R>
constexpr void append_range(R&& rg); // C++23
```

## 概要
Rangeの要素を末尾へ追加する。


## 効果
[`append`](append.md)`(basic_string(`[`from_range`](../../ranges/from_range_t.md)`, `[`forward`](../../utility/forward.md)`<R>(rg), `[`get_allocator()`](get_allocator.md)`));`


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "str";
  const char a[3] = {'i', 'n', 'g'};

  // Rangeを末尾に追加
  s.append_range(a);

  std::cout << s << std::endl;
}
```
* append_range[color ff0000]

### 出力
```
string
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`push_back`](push_back.md)               | 末尾へ要素追加         |
