# コンストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_ofstream[meta class]
* function[meta id-type]

```cpp
basic_ofstream(); // (1)
explicit basic_ofstream(const char* s, ios_base::openmode mode = ios_base::out); // (2)
explicit basic_ofstream(const string& s, ios_base::openmode mode = ios_base::out); // (3)
explicit basic_ofstream(const filesystem::path::value_type* s,
                       ios_base::openmode mode = ios_base::out); // (4) C++17
explicit basic_ofstream(const filesystem::path& s,
                       ios_base::openmode mode = ios_base::out); // (5) C++17
basic_ofstream(const basic_ofstream& rhs) = delete; // (6) C++11
basic_ofstream(basic_ofstream&& rhs); // (7) C++11
```

## 概要
オブジェクトを構築する。一部のオーバーロードでは、ファイルを開く機能を持っている。

## 効果

- (1) : デフォルトコンストラクタ。空の状態にする。
- (2) : 仮引数`s`で指定したファイルを開く。
    - [`rdbuf()->open(s, mode | std::ios_base::out)`](/reference/fstream/basic_filebuf/open.md)を呼び出す(少なくとも書き込み操作ができる)。その結果が失敗だった（戻り値がヌルポインタだった）場合、[`setstate(failbit)`](/reference/ios/basic_ios/setstate.md)を呼び出す。
- (3) : ファイルを指定する引数の型が`std::string`である点を除き、(2)と同じ。
- (4) : [`std::filesystem::path::value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(2)と同じ。
- (5) : ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(2)と同じ。
- (6) : コピーコンストラクタ。コピー不可。
- (7) : ムーブコンストラクタ。ファイルストリームの所有権を移動する。

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::ofstream s1("file.txt");
  if (!s1) {
    std::cerr << "file.txtを開けませんでした。" << std::endl;
  }

  try
  {
    std::ofstream s2("internal.dat", std::ios_base::in | std::ios_base::out | std::ios_base::binary);
    s2.exceptions(std::ios_base::failbit);
  } catch (const std::exception& e) {
    std::cerr << "internal.datを開けませんでした。" << std::endl;
  }
}
```
* exceptions[link /reference/ios/basic_ios/exceptions.md]

### 出力
```
internal.datを開けませんでした。
```

## 実装例

例示のため、`basic_ofstream<>`が内部で保持している`basic_filebuf`オブジェクトを、仮にメンバ変数`sb`とする。

```cpp
// (1)
template<class CharT, class Traits>
basic_ofstream<CharT, Traits>::basic_ofstream()
//: basic_istream(&sb), sb() {           // C++98
  : basic_istream(addressof(sb)), sb() { // C++11
  // 本体は空
}

// (2)
template<class CharT, class Traits>
basic_ofstream<CharT, Traits>::basic_ofstream(const char* s, ios_base::openmode mode)
//: basic_istream(&sb), sb() {           // C++98
  : basic_istream(addressof(sb)), sb() { // C++11
  if (rdbuf()->open(s, mode | ios_base::out) == nullptr) {
    setstate(failbit);
  }
}

// (3)
template<class CharT, class Traits>
basic_ofstream<CharT, Traits>::basic_ofstream(const string& s, ios_base::openmode mode)
  : basic_ofstream(s.c_str(), mode) {
  // 本体は空
}

// (5)
template<class CharT, class Traits>
basic_ofstream<CharT, Traits>::basic_ofstream(basic_ofstream&& rhs)
  : basic_istream(move(rhs)), sb(move(rhs.sb)) {
  // set_rdbuf(&sb);        // C++98
  set_rdbuf(addressof(sb)); // C++11
}
```

## バージョン
### 言語
- C++98
- C++11: ムーブコンストラクタの追加
- C++17: `std::filesystem::path`への対応

## 参照

- [LGW issue 2676. Provide filesystem::path overloads for File-based streams](https://wg21.cmeerw.net/lwg/issue2676)
- [LWG Issue 3130. §[input.output] needs many `addressof`](https://wg21.cmeerw.net/lwg/issue3130)
