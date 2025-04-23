# 契約プログラミング [P2900R14]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、関数の正確な動作を明示的に指定でき、プログラムの正当性を高めるために「契約プログラミング」機能が導入される。

これにより、事前条件(preconditions)、事後条件(postconditions)、及びアサーション(assertions)をコード内で明示的に記述できるようになる。

この機能は、関数のインターフェースに対する期待値を明確にする役割があり、バグの早期発見、コードの可読性向上に寄与することが期待されている。

## 仕様
### キーワード
`pre`、`post`、`assert`は文脈依存キーワードである。これらは`override`や`final`と同様に、特定の文脈でのみ特別な意味を持つ。

- 変数名や関数名として使用可能
  ```cpp
  int pre = 42;  // OK: 変数名として使用
  void post() {} // OK: 関数名として使用
  ```
- 契約指定の文脈でのみ特別な意味を持つ
  ```cpp
  void f()
    pre(true);   // ここでは契約指定として機能
  ```

### 契約の種類
契約には以下の3種類が定められている。

- 事前条件(preconditions)
- 事後条件(postconditions)
- アサーション(assertions)

#### 事前条件(pre)
関数が呼び出される前に満たされているべき条件を指定する。
```cpp
int safe_division(int numerator, int denominator)
    pre(denominator != 0)
{
    return numerator / denominator;
}
```
ここでは、`denominator`が0でないことを事前条件として指定している。

事前条件では、必ずしも関数のパラメータを使用する必要はない。グローバル状態やクラスのメンバ変数など、呼び出し時点で有効な任意の式を使用できる。
```cpp
class Resource {
private:
    bool is_available = false;
public:
    void use()
        pre(is_available)  // 引数を使用していない事前条件
    {
        // リソースを使用
    }
    
    void activate() {
        is_available = true;
    }
};
```

#### 事後条件(post)
関数の実行後に満たされているべき条件を指定する。
```cpp
int increment(int x)
    post(r: r == x + 1)
{
    return x + 1;
}
```
ここでは、`increment`関数の戻り値が`x + 1`であることを事後条件として指定している。

`post`では、返り値を`r`としてバインドし、条件式内で利用している。ここには、任意の変数名が使用できる。変数は定数(`const`)な左辺値参照である。

事後条件の結果名導入子（result-name-introducer）は省略可能である。特に、`void`を返す関数では、戻り値を参照する必要がない場合に省略できる。

```cpp
class Container {
    // ...
public:
    void clear()
        post(empty())  // 結果名導入子を省略した事後条件
    {
        // コンテナの内容をクリア
    }
    
    bool empty() const {
        // コンテナが空かどうかを返す
        return true;
    }
};
```

#### アサーション(assert)
関数の実行中に満たされているべき条件を指定する。
```cpp
void return_negative(int value)
{
    contract_assert(value >= 0);
    return -value;
}
```
ここでは、`return_negative`関数のが引数として受け取っている`value`が0以上であることをアサーションとして指定している。

`contract_assert`は、関数の本体内で使用される。

また、これらの全ては、`[[ likely ]]`や`[[ unlikely ]]`、 `[[ maybe_unused ]]`属性を使用することができる。
```cpp
void return_negative(int value)
  pre [[likely]] (value >= 0)
  post (r [[maybe_unused]] : r <= 0)
  {
    return -value;
  }
```
### 評価の順番
契約式の評価順序に注意が必要である。

事前条件は関数の引数が初期化された後に評価され、事後条件は関数の戻り値が初期化された後、ローカル変数の破棄前に評価される。この順序により、契約式は必要な変数や状態にアクセスできるようになっている。

### 契約の評価モード
契約の評価には、次の4つのモードが存在する。

- ignore: 契約のチェックを無視(ignore)する。

- observe: 契約違反時にハンドラを呼び出し、プログラムの実行を続行します。

- enforce: 契約違反時にハンドラを呼び出し、プログラムを終了します。

- quick_enforce: 契約違反時にハンドラを呼び出さず、即座にプログラムを終了します。

評価モードは、コンパイル時、もしくは実行時に指定できる。

GCCでは、
```bash
g++ -std=c++26 -fcontracts -fcontract-semantic=observe main.cpp
```
のように指定できる。

### 契約違反ハンドラ
契約違反が発生した場合、`std::contracts::contract_violation`型の情報（&lt;contracts&gt;ヘッダー）がハンドラに渡されます。この情報には、違反の種類、発生場所、違反した条件式などが含まれます。

### 使用上の注意
以下の操作は、気をつけなければならない。
- 契約式内において副作用を要する式を記述した場合(グローバル変数の変更、`volatile`変数への参照、`constexpr`でない関数の呼び出しなど)
- 契約式内で例外を送出すると、std::terminate()が呼び出され、プログラムが終了する。
- 通常の関数やメンバ関数には契約を適用できるが、特殊な関数(例えば`default`によって定義されたコピーコンストラクタやデストラクタ)には適用できない。適用すると、プログラムは不適格(ill-formed)となる。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++ 将来 契約に基づくプログラミング](/lang/future/contract-based_programming.md)


## 参照
- [P2900R14 `Contracts for C++`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
