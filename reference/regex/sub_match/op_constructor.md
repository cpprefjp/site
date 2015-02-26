#コンストラクタ (C++11)
* regex[meta header]
* std[meta namespace]

```cpp
constexpr sub_match();
```

##概要
`sub_match` オブジェクトを構築する


##要件
[`is_default_constructible`](../../type_traits/is_default_constructible.md)`<iterator>::value == true` であること。


##効果
各メンバ変数（`first`、`second`、`matched`）を値初期化する。


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  std::csub_match s;
  std::cout << std::boolalpha
            << (s.first == nullptr) << std::endl
            << (s.second == nullptr) << std::endl
            << s.matched << std::endl;
}
```
* csub_match[color ff0000]
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]

###出力
```
true
true
false
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
