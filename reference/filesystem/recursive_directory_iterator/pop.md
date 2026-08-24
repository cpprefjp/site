# pop
* filesystem[meta header]
* std::filesystem[meta namespace]
* recursive_directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void pop();
void pop(std::error_code& ec);
```

## 概要
そのディレクトリの走査を中断する。


## 事前条件
`*this`がデリファレンス可能であること。終端イテレータや、インクリメントによって無効化されたコピーはデリファレンス可能ではない。


## 効果
[`depth()`](depth.md) `== 0`の場合は、`*this`に終端イテレータを代入する。そうでない場合は、そのディレクトリの走査を終了し、親ディレクトリに戻る。


## 事後条件
- `*this`のそれまでのあらゆるコピーは、`==`のドメインにおいて間接参照であることが要求されなくなる


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
  for (; it != last; ++it) {
    // エラーが発生したと想定し、inner_dirディレクトリの走査を中断する
    if (it->path().filename() == "b.txt") {
      it.pop(); // 親ディレクトリを指す (continueしてはいけない)
    }

    std::cout << it->path() << " : " << it.depth() << std::endl;
  }
}
```
* pop()[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]
* it.depth()[link depth.md]

### 出力
```
"dir/inner_dir" : 0
"dir/a.txt" : 0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue `recursive_directory_iterator::pop` must invalidate](https://wg21.cmeerw.net/lwg/issue3067)
- [LWG Issue 2704. `recursive_directory_iterator`'s members should require '`*this` is dereferenceable'](https://cplusplus.github.io/LWG/issue2704)
    - C++17の策定中に、`options`/`depth`/`recursion_pending`/`pop`/`disable_recursion_pending`は`*this`がデリファレンス可能であることを要求する（そうでない場合は未定義動作）と規定された
- [LWG Issue 2706. Error reporting for `recursive_directory_iterator::pop()` is under-specified](https://cplusplus.github.io/LWG/issue2706)
    - C++17の策定中に、`increment`と一貫したエラー報告のため`pop(error_code&)`オーバーロードが追加された
