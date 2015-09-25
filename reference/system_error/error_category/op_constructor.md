#コンストラクタ
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr error_category() noexcept;            // (1) C++14
error_category(const error_category&) = delete; // (2)
```

##概要
- (1) : デフォルトコンストラクタ。`error_category`クラスのオブジェクトを構築する。
- (2) : コピーコンストラクタ。コピー不可。これによって、ムーブコンストラクタも禁止される。


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
- [LWG Issue 2145. `error_category` default constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2145)

