#コンストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_fstream[meta class]
* function[meta id-type]

```cpp
basic_fstream(); // (1)
explicit basic_fstream(const char* s, ios_base::openmode mode = ios_base::in | ios_base::out); // (2)
explicit basic_fstream(const string& s, ios_base::openmode mode = ios_base::in | ios_base::out); // (3)
basic_fstream(const basic_fstream& rhs) = delete; // (4) C++11
basic_fstream(basic_fstream&& rhs); // (5) C++11
```

##概要
オブジェクトを構築する。一部のオーバーロードでは、ファイルを開く機能を持っている。

##効果

- (1) : デフォルトコンストラクタ。空の状態にする。
- (2) : 仮引数`s`で指定したファイルを開く。
    - `rdbuf()->open(s, mode)`を呼び出す。その結果が失敗だった（戻り値がヌルポインタだった）場合、`setstate(failbit)`を呼び出す。
- (3) : ファイルを指定する引数の型が`std::string`である点を除き、(2)と同じ。
- (3) : コピーコンストラクタ。コピー不可。
- (4) : ムーブコンストラクタ。ファイルストリームの所有権を移動する。

## 例

```cpp
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
    s2.exception(std::ios_base::failbit);
  } catch (const std::exception& e) {
    std::cerr << "ファイルを開けませんでした。" << std::endl;
  }
}
```

###出力
```
ファイルを開けませんでした。
ファイルを開けませんでした。
```

##実装例

例示のため、`basic_fstream<>`が内部で保持している`basic_filebuf`オブジェクトを、仮にメンバ変数`sb`とする。

```cpp
// (1)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream() : basic_iostream(&sb), sb() {
  // 本体は空
}

// (2)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(const char* s, ios_base::openmode mode) : basic_iostream(&sb), sb() {
  if (rdbuf()->open(s, mode) == nullptr) {
    setstate(failbit);
  }
}

// (3)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(const string& s, ios_base::openmode mode) : basic_fstream(s.c_str(), mode) {
  // 本体は空
}

// (5)
template<class CharT, class Traits>
basic_fstream<CharT, Traits>::basic_fstream(basic_fstream&& rhs) : basic_iostream(move(rhs)), sb(move(rhs.sb)) {
  set_rdbuf(&sb);
}
```

##バージョン
###言語
- C++98
- C++11: ムーブコンストラクタの追加

##参照
