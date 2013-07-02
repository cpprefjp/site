#assign(C++11)
```cpp
void assign(int val, const error_category& cat) noexcept;
```
* error_category[link ./assign.md]

##概要
エラー値とエラーカテゴリを再設定する。


##要件
パラメータ`val`をエラー値、`cat`をエラーカテゴリと見なして保持する。


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
  std::error_condition ec;

  ec.assign(static_cast<int>(std::errc::invalid_argument), std::generic_category());

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
* assign[color ff0000]

###出力
```
error
22
generic
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照
