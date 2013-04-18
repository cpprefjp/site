#コンストラクタ
```cpp
error_category() = default;

error_category(const error_category&) = delete;
```

##概要

<b>error_categoryクラスは、暗黙的に定義されるデフォルトコンストラクタを持ち、</b>
<b>コピーコンストラクタは削除定義される。</b>


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
* cat[color ff0000]

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
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0(ただしnoexceptは使用不可)<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```