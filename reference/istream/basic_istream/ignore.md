# ignore
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream& ignore(streamsize n = 1, int_type delim = Traits::eof());  // (1)

basic_istream& ignore(streamsize n, char_type delim);  // (2) C++26
```

## 概要

（非書式化入力関数）ストリームから文字を入力して捨てる。
入力ストリームから文字を入力する（読み取り位置を進める）が、それをプログラム上で利用しない場合にこの関数を使用できる。

入力して捨てる文字の数は、2通りの方法で指定できる。

- 文字数の上限を1番目の仮引数`n`で指定する。この指定が不要なら、`numeric_limits<streamsize>::max()`を実引数に与える。
- 2番目の仮引数`delim`を与えると、その文字が現れるまで入力して捨てる処理を実行する。この指定が不要なら、`Traits::eof()`を実引数に与える。

## 効果
(1) : 下記の動作を行う。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
2. 以下のいずれかを満たすまで、`this`内のストリームバッファから文字を入力する（どこへも出力することなく捨てる）。
    - 実引数で指定された`n`文字まで入力した。
        - `n == numeric_limits<streamsize>::max()`の場合、この条件は適用されない。
    - EOFに達した。この場合、ローカルエラー状態に`eofbit`を設定する。
    - 次に入力する文字が`delim`である。
        - 次の文字を`c`として、`Traits::eq_int_type(Traits::to_int_type(c), delim)`が真の場合。
        - `delim`が`Traits::eof()`である場合、この条件は適用されない。

(2) : 下記と等価
```cpp
return ignore(n, traits::to_int_type(delim));
```


## 戻り値
`*this`

## 例
```cpp example
#include <iostream>
#include <limits>

int main() {
  // Cが入力されるまで捨てる。
  std::cin.ignore(std::numeric_limits<std::streamsize>::max(), 'C');

  int x;
  // 好きな数値を入力してください
  if (std::cin >> x) {
    std::cout << x << "が入力されました。" << std::endl;
  }
}
```
* ignore[color ff0000]
* std::cin[link /reference/iostream/cin.md]
* std::streamsize[link /reference/ios/type-streamsize.md]
* max()[link /reference/limits/numeric_limits/max.md]

### 入力
```
ABC200
```

### 出力
```
200が入力されました。
```

## 実装例
TBD

## バージョン
### 言語
- C++98

## 参照
- [LWG Issue 2085. Wrong description of effect 1 of `basic_istream::ignore`](https://cplusplus.github.io/LWG/issue2085)
    - C++14で、`n`文字を入力したという終了条件が「`n != numeric_limits<streamsize>::max()`であり、かつそこまでに`n`文字を入力した場合」であると明確化された
    - この修正は欠陥報告(DR)であり、C++98以降に遡及して適用される。元の文言は「`n != numeric_limits<streamsize>::max()`ならば`n`文字を入力する」という条件文だったため、`n == numeric_limits<streamsize>::max()`のときは前提が偽となって条件が成り立ってしまい、1文字も入力せずに終了すると読めてしまっていた。処理系は当初から意図どおりの動作をしていたため
- [P1264R2 Revising the wording of stream input operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1264r2.pdf)
    - C++23でローカルエラー状態の概念が導入され、入力関数のエラー処理セマンティクスが明確化された
- [P3223R2 Making std::istream::ignore less surprising](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3223r2.html)
    - C++26からオーバーロード(2)が追加された
