#コンストラクタ
```cpp
nested_exception() noexcept;
nested_exception(const nested_exception&) noexcept = default;
```

##nested_exceptionオブジェクトの構築

- `nested_exception() noexcept;`[`current_exception()`](/reference/exception/current_exception.md)を呼び出し、その戻り値をメンバ変数として保持する。

##例外

投げない


##例

```cpp
#include <exception>
#include <iostream>

class my_exception : public std::nested_exception {};

int main()
{
  try {
    try {
      throw 1;
    }
    catch (int& x) {
      my_exception e; // 現在の例外(int)が保持される

      // my_exceptionによって入れ子になった例外へのポインタを取得して再送出
      std::rethrow_exception(e.nested_ptr());
    }
  }
  catch (int& x) {
    std::cout << x << std::endl;
  }
} 
```

###出力

```cpp
1
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 3
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


