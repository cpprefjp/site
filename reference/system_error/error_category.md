#error_category
```cpp
namespace std {
  class error_category;
}
```

##概要

`error_category`クラスは、エラー情報を分類するための基本クラスである。エラーコードから対応するエラーメッセージを取得する処理が異なる場合などで、`error_category`クラスを派生して環境固有のエラー情報を取得するためのクラスを定義することができる。

###メンバ関数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [`(constructor)`](./error_category/error_category.md) | コンストラクタ |
| `virtual ~error_category() noexcept` | デストラクタ |
| `operator=(const error_category&) = delete` | 代入演算子(使用不可) |
| [`name`](./error_category/name.md) | カテゴリ名を取得(pure virtual function) |
| [`default_error_condition`](./error_category/default_error_condition.md) | エラー値と自身のカテゴリから`error_condition`を生成 |
| [`equivalent`](./error_category/equivalent.md) | エラーコードとエラー状態の等値比較 |
| [`message`](./error_category/message.md) | エラーコードに対応するメッセージを取得 |
| [`operator==`](./error_category/equal.md) | 等値比較 |
| [`operator!=`](./error_category/not_equal.md) | 非等値比較 |
| [`operator<`](./error_category/less.md) | 小なり比較 |

###例
```cpp
#include <iostream>
#include <system_error>
#include <string>

class user_defined_error_category : public std::error_category {
public:
  const char* name() const noexcept
  {
    return "user defined error";
  }

  std::string message(int ev) const
  {
    return "error message";
  }
};

const std::error_category& user_defined_category()
{
  static user_defined_error_category cat;
  return cat;
}

int main()
{
  const std::error_category& cat = user_defined_category();
  std::cout << cat.name() << std::endl;
}
```

###出力
```cpp
user defined error
```

##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


###参照

