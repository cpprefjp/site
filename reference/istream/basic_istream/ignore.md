# ignore
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
basic_istream<CharT, Traits>& ignore(streamsize n = 1, int_type delim = Traits::eof());
```

## 概要

（非書式化入力関数）ストリームから文�を入力して捨てる。
入力ストリームから文�を入力する（�み取り位置を進める）が、それをプ�グラム上で利用しない場合にこの関数を使用できる。

入力して捨てる文�の数は、2通りの方法で指定できる。

- 文�数の上限を1番目の仮引数`n`で指定する。この指定が不要なら、`numeric_limits<streamsize>::max()`を実引数に与える。
- 2番目の仮引数`delim`を与えると、その文�が現れるまで入力して捨てる処理を実行する。この指定が不要なら、`Traits::eof()`を実引数に与える。

## 効果

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 以下のいずれかを満たすまで、`this`内のストリームバッファから文�を入力する（どこへも出力することなく捨てる）。
    - 実引数で指定された`n`文�まで入力した。
        - `n == numeric_limits<streamsize>::max()`の場合、この条件は適用されない。
    - EOFに達した。この場合、`setstate(eofbit)`を呼び出す。
    - 次に入力する文�が`delim`である。
        - 次の文�を`c`として、`Traits::eq_int_type(Traits::to_int_type(c), delim)`が真の場合。
        - `delim`が`Traits::eof()`である場合、この条件は適用されない。

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
