# recursion_pending
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool recursion_pending() const;
```

## 概要
再帰しないかどうかが未決定かを確認する。


## 事前条件
`*this`がデリファレンス可能であること。終端イテレータや、インクリメントによって無効化されたコピーはデリファレンス可能ではない。


## 戻り値
[`disable_recursion_pending()`](disable_recursion_pending.md)がそのディレクトリに対して呼ばれていなければ`true`、そうでなければ`false`を返す。


## 例外
投げない


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
  fs::create_directory("dir/inner_dir");
  std::ofstream{"dir/inner_dir/b.txt"};

  fs::recursive_directory_iterator it{"dir"};
  fs::recursive_directory_iterator last{};

  std::cout << std::boolalpha;
  for (; it != last; ++it) {
    if (it->path().filename() == "inner_dir")
        it.disable_recursion_pending();

    std::cout << it->path() << " : " << it.recursion_pending() << std::endl;
  }
}
```
* it.recursion_pending()[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]
* it.disable_recursion_pending()[link disable_recursion_pending.md]

### 出力例
```
"dir/inner_dir" : false
"dir/a.txt" : true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):

## 参照
- [LWG Issue 2704. `recursive_directory_iterator`'s members should require '`*this` is dereferenceable'](https://cplusplus.github.io/LWG/issue2704)
    - C++17の策定中に、`options`/`depth`/`recursion_pending`/`pop`/`disable_recursion_pending`は`*this`がデリファレンス可能であることを要求する（そうでない場合は未定義動作）と規定された
