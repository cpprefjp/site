# length_error
* stdexcept[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class length_error : public logic_error;
}
```
* logic_error[link logic_error.md]

## 概要
`length_error`クラスは、オブジェクトの最大許容サイズを超える長さのオブジェクトを生成しようとしたことを通知するために送出される例外クラスである。

[`std::basic_string`](/reference/string/basic_string.md)や[`std::vector`](/reference/vector.md)などのコンテナで、`max_size()`を超える要素数を要求した場合などに送出される。

このクラスは[`logic_error`](logic_error.md)を公開継承しており、`logic_error`として捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](length_error/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](length_error/op_destructor.md) | デストラクタ | |
| [`operator=`](length_error/op_assign.md) | 代入演算子 | |
| [`what`](/reference/exception/exception/what.md) | エラー理由を取得する（[`std::exception`](/reference/exception/exception.md)から継承） | |


## 例
```cpp example
#include <stdexcept>
#include <iostream>
#include <string>

int main()
{
  try {
    std::string s;
    // 最大長を超える長さを要求する
    s.resize(s.max_size() + 1);
  }
  catch (const std::length_error& e) {
    std::cout << "length_error: " << e.what() << std::endl;
  }
}
```
* std::length_error[color ff0000]
* s.max_size()[link /reference/string/basic_string/max_size.md]
* s.resize[link /reference/string/basic_string/resize.md]

### 出力例
```
length_error: basic_string::_M_replace_aux
```

例外オブジェクトが保持するメッセージの内容は、処理系によって異なる。


## 関連項目
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
