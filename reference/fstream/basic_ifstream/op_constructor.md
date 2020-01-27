# コンストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_ifstream[meta class]
* function[meta id-type]

```cpp
basic_ifstream(); // (1)
explicit basic_ifstream(const char* s, ios_base::openmode mode = ios_base::in); // (2)
explicit basic_ifstream(const string& s, ios_base::openmode mode = ios_base::in); // (3)
explicit basic_ifstream(const filesystem::path::value_type* s,
                       ios_base::openmode mode = ios_base::in); // (4) C++17
explicit basic_ifstream(const filesystem::path& s,
                       ios_base::openmode mode = ios_base::in); // (5) C++17
basic_ifstream(const basic_ifstream& rhs) = delete; // (6) C++11
basic_ifstream(basic_ifstream&& rhs); // (7) C++11
```

## 概要
オブジェクトを構築する。一部のオーバー�ードでは、ファイルを開く機能を持っている。

## 効果

- (1) : デフォルトコンストラクタ。空の状態にする。
- (2) : 仮引数`s`で指定したファイルを開く。
    - [`rdbuf()->open(s, mode | std::ios_base::in)`](/reference/fstream/basic_filebuf/open.md)を呼び出す(少なくとも�み取り操作ができる)。その結果が失敗だった（戻り値がヌルポインタだった）場合、[`setstate(failbit)`](/reference/ios/basic_ios/setstate.md)を呼び出す。
- (3) : ファイルを指定する引数の型が`std::string`である点を除き、(2)と同じ。
- (4) : [`std::filesystem​::​path​::​value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(2)と同じ。
- (5) : ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(2)と同じ。
- (6) : コピーコンストラクタ。コピー不可。
- (7) : ムーブコンストラクタ。ファイルストリームの所有権を移動する。

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::ifstream s1("file.txt");
  if (!s1) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }

  try
  {
    std::ifstream s2("internal.dat", std::ios_base::in | std::ios_base::out | std::ios_base::binary);
    s2.exceptions(std::ios_base::failbit);
  } catch (const std::exception& e) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }
}
```
* exceptions[link /reference/ios/basic_ios/exceptions.md]

### 出力
```
ファイルを開けませんでした。
ファイルを開けませんでした。
```

## 実装例

例示のため、`basic_ifstream<>`が内部で保持している`basic_filebuf`オブジェクトを、仮にメンバ変数`sb`とする。

```cpp
// (1)
template<class CharT, class Traits>
basic_ifstream<CharT, Traits>::basic_ifstream() : basic_istream(&sb), sb() {
  // 本体は空
}

// (2)
template<class CharT, class Traits>
basic_ifstream<CharT, Traits>::basic_ifstream(const char* s, ios_base::openmode mode) : basic_istream(&sb), sb() {
  if (rdbuf()->open(s, mode | ios_base::in) == nullptr) {
    setstate(failbit);
  }
}

// (3)
template<class CharT, class Traits>
basic_ifstream<CharT, Traits>::basic_ifstream(const string& s, ios_base::openmode mode) : basic_ifstream(s.c_str(), mode) {
  // 本体は空
}

// (5)
template<class CharT, class Traits>
basic_ifstream<CharT, Traits>::basic_ifstream(basic_ifstream&& rhs) : basic_istream(move(rhs)), sb(move(rhs.sb)) {
  set_rdbuf(&sb);
}
```

## バージョン
### 言語
- C++98
- C++11: ムーブコンストラクタの追加
- C++17: `std::filesystem::path`への対応

## 参照

- [LGW issue 2676. Provide filesystem::path overloads for File-based streams](https://wg21.cmeerw.net/lwg/issue2676)
