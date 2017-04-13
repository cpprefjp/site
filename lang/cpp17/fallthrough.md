# [[fallthrough]]属性
* cpp17[meta cpp]

## 概要

`[[fallthrough]]`属性は意図したフォールスルーであることをコンパイラに伝え、警告を抑制するための属性である。

switch-case文において意図しないフォールスルーによってバグが発生することを防止するため、コンパイラはコンパイル時にフォールスルーを検出して警告を出力する場合がある。

プログラマが意図してフォールスルーを行う場合、コンパイラの警告は無用であるが、警告を抑制する方法が無かった。`[[fallthrough]]`属性により意図したフォールスルーであることをコンパイラに伝え、警告を抑制することができる。

## 仕様

`[[fallthrough]]`属性はフォールスルーしたい各`case`の最後の式に記述する。ただし最後の`case`/`default`に記述するとコンパイルエラーとなる。

## 例
```cpp
void f(int n) {
  void g(), h(), i();
  switch (n) {
  case 1:
  case 2: //caseの間に1つも文がなければフォールスルーは警告されない
    g();
    [[fallthrough]];
  case 3: //[[fallthrough]]属性の記述によりフォールスルー警告は無効化される
    h();
  case 4: //コンパイラがフォールスルーを警告する
    i();
    [[fallthrough]]; //最後のcaseには記述できない、コンパイルエラーになる
  }
}
```

### 出力

clang++ 5.0.0 にてコンパイルした場合。

```
fallthrough.cpp:12:5: error: fallthrough annotation does not directly precede switch label
    [[fallthrough]]; //最後のcaseには記述できない、コンパイルエラーになる
    ^
1 error generated.
```

## 検討されたほかの選択肢

* キーワードではなく属性である理由

`fallthrough`をキーワードとして定義した場合、他の制御構文キーワード`continue`や`break`と揃う利点があるが、`fallthrough`を関数名、変数名に使用しているプログラムがあった場合、過去との互換性を壊す可能性がある。

* caseラベルに属性を指定せず、単独で記述する理由

下記のように`case`内に分岐があって分岐の中で`break`を記述している場合に、バグを見逃してしまう場合がある。

```cpp
switch (n) {
case 2:
  if (c1) {
    f();
    break;
  } else if (c2) {
    g(); // 警告、case 3にフォールスルーするがバグではないか？
  } else if (c3) {
    h();
    break;
  } else if (c4) {
    g();
    h();
    [[fallthrough]]; // case 3にフォールスルーするのは意図的である
  }
case 3:
  // もしcaseに属性を指定する仕様だったら、
  // if (c2) のフォールスルーは正しいことになり、バグだった場合に見逃す
  h();
}
```

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [P0068R0 Proposal of [[unused]], [[nodiscard]] and [[fallthrough]] attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0068r0.pdf)
- [P0188R1 Wording for [[fallthrough]] attribute.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0188r1.pdf)
