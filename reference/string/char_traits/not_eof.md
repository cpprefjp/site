# not_eof
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static int_type not_eof(const int_type& c);             // C++03
static constexpr int_type not_eof(int_type c) noexcept; // C++11
```

## 概要
文�がファイル終端文�(EOF)じゃないかを判定する。


## 戻り値
[`eq_int_type`](eq_int_type.md)`(c,` [`eof`](eof.md)`()) == false`の場合は`c`を返す。そうでない場合は、[`eq_int_type`](eq_int_type.md)`(f,` [`eof`](eof.md)`()) == false`となるような値`f`を返す。

つまり、EOF以外の値が渡されたら渡された値を返し、EOFが渡されたらEOF以外の値を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  using traits = std::char_traits<char>;

  std::cout << std::boolalpha;

  // EOFではない値を渡すと、渡した値が返される
  {
    int a = traits::to_int_type('a');
    int result = traits::not_eof(a);
    std::cout << (a == result) << std::endl;
  }

  // EOFを渡すと、EOF以外の値が返される
  {
    int result = traits::not_eof(traits::eof());
    std::cout << (result != traits::eof()) << std::endl;
  }
}
```
* not_eof[color ff0000]
* to_int_type[link to_int_type.md]
* eof()[link eof.md]

### 出力例
```
true
true
```

## 参照

