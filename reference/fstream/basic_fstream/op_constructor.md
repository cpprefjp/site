# コンストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_fstream[meta class]
* function[meta id-type]

```cpp
basic_fstream(); // (1) C++98
explicit basic_fstream(const char* s, ios_base::openmode mode = ios_base::in | ios_base::out); // (2) C++98
explicit basic_fstream(const string& s, ios_base::openmode mode = ios_base::in | ios_base::out); // (3) C++11
explicit basic_fstream(const filesystem::path::value_type* s,
                       ios_base::openmode mode = ios_base::in|ios_base::out); // (4) C++17
explicit basic_fstream(const filesystem::path& s,
                       ios_base::openmode mode = ios_base::in | ios_base::out); // (5) C++17
template <class T>
explicit basic_fstream(const T& s,
                       ios_base::openmode mode = ios_base::in | ios_base::out); // (5) C++23
basic_fstream(const basic_fstream& rhs) = delete; // (6) C++11
basic_fstream(basic_fstream&& rhs); // (7) C++11
```

## 概要
オブジェクトを構築する。一部のオーバーロードでは、ファイルを開く機能を持っている。

## テンプレートパラメータ制約
- (5) C++23 : [`is_same_v`](/reference/type_traits/is_same.md)`<T, filesystem::path>`が`true`であること

## 効果

- (1) : デフォルトコンストラクタ。空の状態にする。
- (2) : 仮引数`s`で指定したファイルを開く。
    - [`rdbuf()->open(s, mode)`](/reference/fstream/basic_filebuf/open.md)を呼び出す。その結果が失敗だった（戻り値がヌルポインタだった）場合、[`setstate(failbit)`](/reference/ios/basic_ios/setstate.md)を呼び出す。
- (3) : ファイルを指定する引数の型が`std::string`である点を除き、(2)と同じ。
- (4) : [`std::filesystem::path::value_type`](/reference/filesystem/path.md)の型が`char`ではないときのみ定義される。効果は(2)と同じ。
- (5) : ファイルを指定する引数の型が[`std::filesystem::path`](/reference/filesystem/path.md)である点を除き、(2)と同じ。C++23では、`path`へ暗黙変換可能な型（[`std::string_view`](/reference/string_view/basic_string_view.md)など）が渡されたときの高コストな暗黙変換を防ぐため、`filesystem::path`とまったく同じ型のみを受け取る制約付きテンプレートとして定義される。
- (6) : コピーコンストラクタ。コピー不可。
- (7) : ムーブコンストラクタ。ファイルストリームの所有権を移動する。

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream s1("file.txt");
  if (!s1) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }

  try
  {
    std::fstream s2("internal.dat", std::ios_base::in | std::ios_base::out | std::ios_base::binary);
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

例示のため、`basic_fstream<>`が内部で保持している`basic_filebuf`オブジェクトを、仮にメンバ変数`sb`とする。

```cpp
// (1)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream()
//: basic_iostream(&sb), sb() {           // C++98
  : basic_iostream(addressof(sb)), sb() { // C++11
  // 本体は空
}

// (2)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(const char* s, ios_base::openmode mode)
//: basic_iostream(&sb), sb() {           // C++98
  : basic_iostream(addressof(sb)), sb() { // C++11
  if (rdbuf()->open(s, mode) == nullptr) {
    setstate(failbit);
  }
}

// (3)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(const string& s, ios_base::openmode mode)
  : basic_fstream(s.c_str(), mode) {
  // 本体は空
}

// (5)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(basic_fstream&& rhs)
  : basic_iostream(move(rhs)), sb(move(rhs.sb)) {
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

- [LWG Issue 2676. Provide `filesystem::path` overloads for File-based streams](https://cplusplus.github.io/LWG/issue2676)
    - C++17で、`filesystem::path`および`filesystem::path::value_type*`を受け取るオーバーロードが追加された（`basic_filebuf`は`open`のみ、`basic_ifstream`/`basic_ofstream`/`basic_fstream`はコンストラクタと`open`）
- [LWG Issue 3130. §[input.output] needs many `addressof`](https://wg21.cmeerw.net/lwg/issue3130)
- [LWG Issue 3430. `std::fstream` & co. should be constructible from `string_view`](https://cplusplus.github.io/LWG/issue3430)
    - C++23で、`filesystem::path`を受け取るコンストラクタ(5)が、`path`へ暗黙変換可能な型による高コストな変換を防ぐため、`is_same_v<T, filesystem::path>`を制約とする制約付きテンプレートに変更された
