# if文とswitch文の条件式と初期化を分離
* cpp17[meta cpp]

## 概要

従来`for`文しか使用できなかった初期化を`if`文と`switch`文でも使えるようになった。

`for`文は下記のように初期化と条件式を同時に書くことができる。
初期化で宣言した変数は`for`文のスコープのみで有効であり`for`文の外では参照できない特徴がある。

```cpp
for (auto i = 0; i < n; i++) {
  //i はこのスコープ内で有効
  ...
}
//この時点で i は無効
```

C++17では`if`文と`switch`文においても、`for`文との一貫性を持った初期化を記述できるようになった。

```cpp
if (status_code c = bar(); c != SUCCESS) {
  //ステータスコード c が成功ではなかったら、何かして、処理を終了する
  ...
  return c;
} else {
  //ステータスコード C が成功だったら、何かして、処理を続行する
  ...
}
//この時点で c は無効

switch (Foo gadget(args); auto s = gadget.status()) {
case OK:
  //正常
  gadget.zip();
  break;
case Warn:
  //異常だが、続行
  gadget.log();
  break;
case Bad:
  //異常なので、中断
  throw BadFoo(s.message());
}
//この時点で gadget, s は無効
```


## 仕様

詳細な文法は下記の通り。

```
init-statement:
  expression-statement
  simple-declaration

selection statement:
  if ( init-statement opt condition ) statement
  if ( init-statement opt condition ) statement else statement
  switch ( init-statement opt condition ) statement
```

初期化`init-statement`は省略可能なため、従来の`if`文や`switch`文の書き方も文法違反にはならない。

この機能と、等しい意味を持つ従来記法は下記の通りである。

初期化付き`if`文。

```cpp
//新しい
if ( init-statement condition ) statement

//従来
{
  init-statement
  if ( condition ) statement
}
```

初期化付き`if-else`文。

```cpp
//新しい
if ( init-statement condition ) statement else statement

//従来
{
  init-statement
  if ( condition ) statement else statement
}
```

初期化付き`switch`文。

```cpp
//新しい
switch ( init-statement condition ) statement

//従来
{
  init-statement
  switch ( condition ) statement
}
```


## 例

異常があれば関数を脱出する1行の`if`文がより短く記述できる。

```cpp
status_code foo() {
  int n = get_value();

  if (status_code c = bar(n); c != status_code::SUCCESS) { return c; }
  if (status_code c = do_more_stuff(); c != status_code::SUCCESS) { return c; }

  return status_code::SUCCESS;
}
```

また、ロックを取得してからリストにアクセスする場合なども短く記述できる。

```cpp
if (std::lock_guard<std::mutex> lock(mx); shared_flag) { unsafe_ping(); shared_flag = false; }
```


### 出力

```
```


## この機能が必要になった背景・経緯

変数の宣言あるいは初期化を行い、`if`文や`switch`文のスコープ内だけで変数を使用するケースは多数あるにも関わらず、
`if`文や`switch`文に初期化を行う記法は存在しなかった。

C++14以前でも同様の意味を持つ記述は不可能ではないが、外側にスコープを追加する必要があり冗長な記述になっていた:

```cpp
status_code foo() {
  int n = get_value();

  {
    status_code C = bar(n);
    if (c != status_code::SUCCESS) { return c; }
  }
  {
    status_code c = do_more_stuff();
    if (c != status_code::SUCCESS) { return c; }
  }

  return status_code::SUCCESS;
}
```

見方を変えると`for`文で可能な初期化が、なぜか`if`文や`switch`文ではできない、文法に一貫性がない問題と見ることもできる。


## 検討されたほかの選択肢

### 従来の機能を使う

仕様で説明したようにこの機能を使わなくても、従来の機能を使って`{ init; if (cond) E; }`と書けば同じ効果を得られる。
しかし従来の記述が冗長である問題は解決しない。

従来の記述を面倒に思い、時にプログラマは外側のスコープを省略して書いてしまう:

```cpp
//{ この括弧を省略してしまった
auto it = m.find(10);
if (it != m.end()) { return it->size(); }
//} この括弧を省略してしまった

// "it" は不要なのにここでも使えてしまう、すなわちリークしてしまう
```

大抵は括弧を省略しても同じ効果を得られるし、変数がリークしても問題にならないが、オブジェクトの生存期間が大事な場合もある。
例えばミューテックスのロックがリークすると予測しづらいバグが発生しやすい。

新しい記法を使えば、初期化に使用した変数のスコープは`if`文または `switch`文の内部に限定されるため、
変数の名前をつけるときに外側のスコープを意識して長い名前をつける必要がない利点もある。

### ライブラリを使う

従来記法で同じ意味の記述が可能である以上、ライブラリによる実現は不可能ではないと思われる。
しかしコードが見づらくなる問題があるだろう。

### 他言語の記法を取り入れる

従来と異なる記法、例えば `with (init) if (cond) E;` のような記法を取り入れる方法も考えられる。
新しいキーワードの導入により過去のC++コードとの互換性に問題が生じる可能性があるし、
新しい概念を教えたり広めたりするコストが掛かる。さらに`for`文と文法の一貫性を取れる機会が失われてしまう問題がある。


## 参照
- [P0305R1 Selection statements with initializer.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0305r1.html)
