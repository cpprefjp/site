#clear (C++11)
```cpp
void clear() noexcept;
```

##概要
エラー情報をクリアする


##効果
エラー値を`0`、エラーカテゴリを[`system_category()`](../system_category.md)に初期化する。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  ec.clear();

  if (ec) {
    std::cout << "error" << std::endl;
  }
  else {
    std::cout << "success" << std::endl;
  }

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
}
```
* clear[color ff0000]

###出力
```
success
0
system
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
