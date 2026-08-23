# operator<<
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_entry[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  template <class CharT, class Traits>
  friend std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os, const directory_entry& d); // (1) C++17
}
```

## 概要
`directory_entry`オブジェクトが指すパスを、出力ストリームに出力する。

この演算子は、`directory_entry`クラスの*Hidden friends*として定義される。


## 効果
以下と等価である：

```cpp
return os << d.path();
```
* d.path()[link path.md]


## 戻り値
`os`


## 備考
この演算子は、[LWG Issue 2989](https://cplusplus.github.io/LWG/issue2989)によって一度削除されたが、それが誤りであったため[LWG Issue 3171](https://cplusplus.github.io/LWG/issue3171)によって復活した。


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  std::ofstream{"dir/a.txt"};

  fs::directory_entry entry{"dir/a.txt"};
  std::cout << entry << std::endl;
}
```
* entry[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]

### 出力例
```
"dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 参照
- [LWG Issue 2989. Path's stream insertion operator lets you insert everything under the sun](https://cplusplus.github.io/LWG/issue2989)
    - この解決で、`directory_entry`のストリーム挿入演算子が誤って削除された
- [LWG Issue 3171. LWG2989 breaks `directory_entry` stream insertion](https://cplusplus.github.io/LWG/issue3171)
    - C++23で、[LWG 2989](https://cplusplus.github.io/LWG/issue2989)が誤って削除した`directory_entry`のストリーム挿入演算子が復活した
