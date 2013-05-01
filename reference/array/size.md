#size
```cpp
constexpr size_type size() noexcept;
```

##概要

<b>コンテナの要素数を取得する。</b>


##戻り値

`array`クラスのテンプレートパラメータである`N`定数を返す。


##例外

投げない


##計算量

定数時間


##備考



##例

```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};

  std::cout << ar.size() << std::endl;
}
```
* size[color ff0000]

###出力

```cpp
3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```