#operator==
```cpp
bool operator==(const error_category& rhs) const noexcept;
```

##概要

<b>error_categoryが同じオブジェクトかどうかを判定する。</b>
<b>同じオブジェクトであればtrue、そうでなければfalseを返す。</b>


##戻り値

`this == &rhs`

##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>

int main()
{
  const std::error_category& a = std::generic_category();
  const std::error_category& b = std::generic_category();
  const std::error_category& c = std::system_category();

  std::cout << std::boolalpha;

  std::cout << (a == b) << std::endl;
  std::cout << (a == c) << std::endl;
}
```
* ==[color ff0000]
* ==[color ff0000]

###出力

```cpp
true
false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```