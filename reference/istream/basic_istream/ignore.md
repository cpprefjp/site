#get
```cpp
basic_istream<CharT, Traits>& ignore(streamsize n = 1, int_type delim = Traits::eof());
```

##概要

（非書式化入力関数）ストリームから文字を入力して捨てる。
入力ストリームから文字を入力する（読み取り位置を進める）が、それをプログラム上で利用しない場合にこの関数を使用できる。

入力して捨てる文字の数は、2通りの方法で指定できる。

- 文字数の上限を1番目の仮引数`n`で指定する。この指定が不要なら、`numeric_limits<streamsize>::max()`を実引数に与える。
- 2番目の仮引数`delim`を与えると、その文字が現れるまで入力して捨てる処理を実行する。この指定が不要なら、`Traits::eof()`を実引数に与える。

##効果

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、`this`内のストリームバッファから文字を入力する（どこへも出力することなく捨てる）。
    - 実引数で指定された`n`文字まで入力した。
        - `n == numeric_limits<streamsize>::max()`の場合、この条件は適用されない。
    - EOFに達した。この場合、`setstate(eofbit)`を呼び出す。
    - 次に入力する文字が`delim`である。
        - 次の文字を`c`として、`Traits::eq_int_type(Traits::to_int_type(c), delim)`が真の場合。
        - `delim`が`Traits::eof()`である場合、この条件は適用されない。

##戻り値
`*this`

##例
```cpp
#include <iostream>
#include <limits>

int main() {
  std::cout << "好きなアルファベット1文字を入力してください: ";
  int c = std::cin.get();
  if (c == EOF) {
    return 1;
  }
  std::cout << c << "が入力されました。" << std::endl;

  // 改行文字までを捨てる。
  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

  int x;
  std::cout << "好きな数値を入力してください: ";
  if (std::cin >> x) {
    std::cout << x << "が入力されました。" << std::endl;
  }
}
```

```std::cin```が行バッファリング（端末で利用者が改行を打鍵しないとOSから入力ストリームバッファに入力が到達しない）であることを前提としている。

##出力

```
好きなアルファベット1文字を入力してください: (A[Enter]を打鍵)
Aが入力されました。
好きな数値を入力してください: (200[Enter]を打鍵)
200が入力されました。
```

##実装例
TBD

##バージョン
###言語
- C++98

##参照
