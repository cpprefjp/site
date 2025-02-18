# [[nodiscard]]をコンストラクタのオーバーロードごとに付加できるようにする [P1771R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
戻り値が使用されない場合に警告を出力させる[`[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)を、コンストラクタのオーバーロードに付加できるようにする。

C++17段階では、クラス定義に`[[nodiscard]]`属性を付加することはできた。しかし、デフォルトコンストラクタなどリソース確保しないコンストラクタは戻り値を無視しても無害であるため、リソース確保するコンストラクタのオーバーロードにのみ`[[nodiscard]]`属性を付加したい場合があり、そのようなユースケースをサポートする。

この変更はC++17に対する欠陥とみなされ、コンパイラはC++20対応としてではなくC++17段階からこの仕様を実装している可能性がある。


## 仕様
- C++17までは「`nodiscard`が付加された (CV修飾を付加できる) クラスもしくは列挙型」をnodiscard-typeと呼んでいたが、C++20では「到達可能な宣言に`nodiscard`が付加された (CV修飾を付加できる) クラスもしくは列挙型」をnodiscard-typeと呼ぶよう変更
- `nodiscard`宣言されたコンストラクタを使用して構築もしくは初期化したオブジェクトを明示的に型変換することは、「戻り値を無視しない呼び出し (nodiscard call)」と見なす
    - ただし、明示的に`void`にキャストする以外での、評価される可能性のある戻り値を無視しない呼び出しは推奨しない。このような場合に実装は警告を出力する必要がある


## 例
```cpp example
#include <fstream>

class File {
  std::ifstream file_;
public:
  // リソース確保しないコンストラクタ
  File() = default;

  // リソース確保するコンストラクタ
  [[nodiscard]]
  explicit File(const std::string& filename)
    : file_(filename) {}
};

int main() {
  File{};        // 警告なし
  File{"a.txt"}; // 警告 : File::File(const std::string&)コンストラクタの戻り値が無視されている
  static_cast<void>(File{"a.txt"}); // 警告なし
}
```

### 出力例
```
prog.cc: In function 'int main()':
prog.cc:17:15: warning: ignoring return value of 'File::File(const string&)', declared with attribute 'nodiscard' [-Wunused-result]
   17 |   File{"a.txt"}; // 警告 : File::File(const std::string&)コンストラクタの戻り値が無視されている
      |               ^
prog.cc:11:12: note: declared here
   11 |   explicit File(const std::string& filename)
      |            ^~~~
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 `[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)
- [C++20 `[[nodiscard]]`属性に理由となる文字列を付加できるようにする](nodiscard_should_have_a_reason.md)


## 参照
- [P1771R1 `[[nodiscard]]` for constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1771r1.pdf)
