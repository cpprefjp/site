#コンストラクタ (C++11)
```cpp
error_category() = default;
error_category(const error_category&) = delete;
```

##概要
`error_category`クラスは、暗黙的に定義されるデフォルトコンストラクタを持ち、
コピーコンストラクタは削除定義される。


##例
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
```
user defined error
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0(ただしnoexceptは使用不可)


##参照
