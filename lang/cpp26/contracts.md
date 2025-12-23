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
`pre`、`post`は文脈依存キーワードである。これらは`override`や`final`と同様に、特定の文脈でのみ特別な意味を持つ。`contract_assert`は完全なキーワードである。

- `pre`と`post`は変数名や関数名として使用可能
  ```cpp
  int pre = 42;  // OK: 変数名として使用
  void post() {} // OK: 関数名として使用
  ```
- 契約指定の文脈でのみ特別な意味を持つ
  ```cpp
  void f()
    pre(true);   // ここでは契約指定として機能
  ```
- `contract_assert`は既存の`assert`マクロとの衝突を避けるための完全なキーワード
  ```cpp
  void g() {
    contract_assert(true);  // アサーション文
  }
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

`post`では、戻り値を`r`としてバインドし、条件式内で利用している。ここには、任意の変数名が使用できる。変数は定数(`const`)な左辺値参照である。

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
int return_negative(int value)
{
    contract_assert(value >= 0);
    return -value;
}
```
ここでは、`return_negative`関数が引数として受け取っている`value`が0以上であることをアサーションとして指定している。

`contract_assert`は、関数の本体内で使用される。

また、これらの全ては、`[[ likely ]]`や`[[ unlikely ]]`、 `[[ maybe_unused ]]`属性を使用することができる。
```cpp
int return_negative(int value)
  pre [[likely]] (value >= 0)
  post (r [[maybe_unused]] : r <= 0)
  {
    return -value;
  }
```
### 構文上の制約
契約プログラミングには、いくつかの構文上の制約がある。

#### 複数の宣言
関数に複数の宣言がある場合、それらすべてに同じ契約指定子の並びを指定することも、一部の宣言にのみ指定することもできる。契約指定子の並びが指定されていない宣言は、他の宣言から契約アサーションを継承する。

```cpp
int f(int x) pre(x > 0);  // 宣言
int f(int x);             // OK: 契約アサーションを継承
int f(int x) pre(x > 0) { // OK: 定義でも同じ契約を指定
    return x * 2;
}
```

#### 仮想関数
仮想関数に事前条件または事後条件の指定子を付けることは不適格（ill-formed）である。仮想関数への`pre`と`post`のサポートは、将来の拡張として提案される予定である。

```cpp
struct Base {
    // エラー：仮想関数に契約指定子を適用できない
    virtual int compute(int x) pre(x > 0) = 0;
};
```

#### デフォルト化・削除された関数
最初の宣言でデフォルト化（`= default`）された関数に事前条件または事後条件指定子を付けることは不適格（ill-formed）である。

```cpp
struct X {
    X() pre(true) = default;           // エラー: 最初の宣言でdefault化
    X(const X&) pre(true) = default;   // エラー: 最初の宣言でdefault化
};
```

ただし、最初の宣言ではない宣言でデフォルト化する場合は契約指定子を付けることができる。

```cpp
struct Y {
    Y() pre(true);                      // 最初の宣言に契約指定子
};
Y::Y() pre(true) = default;             // OK: 最初の宣言ではない（pre(true)は省略可能）
```

また、明示的に削除（`= delete`）された関数に事前条件または事後条件指定子を付けることは不適格である。

```cpp
struct Z {
    Z() pre(true) = delete;             // エラー: 削除された関数
    Z& operator=(const Z&) pre(true) = delete; // エラー: 削除された関数
};
```

#### コンストラクタとデストラクタの制約
コンストラクタの事前条件アサーションまたはデストラクタの事後条件アサーションの述語内で、クラスの非静的データメンバを`this->`なしで直接参照すると、プログラムは不適格となる。これは、オブジェクトの生存期間の開始前または終了後にメンバにアクセスする未定義動作のリスクを最小限に抑えるためである。

```cpp
struct X {
    int i = 0;
    bool f();

    X()
        pre(i == 0)              // エラー: thisなしでメンバ参照
        pre(f())                 // エラー: thisなしでメンバ関数呼び出し
        pre(this->i == 0)        // OK: thisを明示的に使用
        pre(this->f())           // OK
    {}

    ~X()
        pre(i == 0)              // OK: デストラクタの事前条件
        post(i == 0)             // エラー: デストラクタの事後条件でメンバ参照
        post(this->i == 0)       // OK
    {}
};
```

#### await式とyield式
コルーチン内の契約アサーションの述語に、そのコルーチンの中断コンテキスト内にある`await`式または`yield`式が含まれている場合、プログラムは不適格となる。

```cpp
std::generator<int> f() {
    contract_assert(((co_yield 1), true));  // エラー
}

stdex::task<void> g() {
    contract_assert((co_await query_database()) > 0);  // エラー
}
```

#### 関数へのポインタとメンバ関数へのポインタ
関数へのポインタやメンバ関数へのポインタに契約指定子を適用することはできない。

```cpp
typedef int (*fpt)(int) post(r: r != 0);  // エラー

int f(int x) post(r: r != 0);
int (*fp)(int) post(r: r != 0) = f;       // エラー
```

ただし、契約アサーションは関数の型の一部ではないため、契約付きの関数のアドレスを通常の関数ポインタに代入できる。

```cpp
int f(int x) post(r: r != 0);
int (*fp)(int) = f;  // OK
```

関数ポインタを通して関数を呼び出す場合でも、その関数の契約アサーションは通常通り評価される必要がある。

#### 関数型エイリアス
関数型エイリアスに契約指定子を適用することはできない。

```cpp
using ft = int(int) post(r: r != 0);  // エラー
```

ただし、関数型エイリアスを使用する関数宣言には契約指定子を適用できる。

```cpp
using ft = int(int);
ft f post(r: r != 0);  // OK
```

#### C言語の可変長引数パラメータの使用
契約述語内で`va_start`マクロを使用すると、プログラムは不適格となる（診断不要）。

### 意味論

#### 名前探索とアクセス制御
関数契約アサーションの述語に対する名前探索とアクセス制御のルールは、その関数の宣言の他の部分と同様に適用される。

- 非静的メンバ関数の宣言の一部として、`this`式が使用可能であり、関数の暗黙のオブジェクトパラメータを参照する。
- メンバ関数の場合、述語はprivateメンバにアクセスできる。
- 事後条件アサーションは結果バインディング（result binding）という新しい宣言をそのスコープに導入し、この名前は外側のスコープの他の名前を隠す。

```cpp
struct Y {
    int i;
public:
    void f() pre(i == 0);                    // OK
    friend void g(Y* y) pre(y->i == 0);      // OK
};

int r = 10;
int h() post(r : r != ::r);  // OK: 結果バインディングのrは外側のrを隠す
```

#### 暗黙のconst性
契約チェックは、プログラムの状態を変更するのではなく観察するものである。これを促進するために、契約述語内で参照される変数には暗黙的に`const`修飾が適用される。

```cpp
void f(int x) {
    contract_assert(++x > 0);  // エラー: xは暗黙的にconstとして扱われる
}
```

ただし、述語内で呼び出される関数は`constexpr`である必要はない。ロギングなどのデバッグ目的で副作用を持つ関数を呼び出すことは許可されるが、プログラムの正当性に影響を与える破壊的な副作用は避けるべきである。

#### 結果バインディング
事後条件の結果バインディングは、関数の戻り値オブジェクトを参照する。結果バインディングによって導入される変数は、定数（`const`）な左辺値参照である。

```cpp
int f(int i)
    post(result: result >= i);  // resultは戻り値への定数参照
```

結果バインディングには、`[[maybe_unused]]`などの属性を適用できる。

```cpp
int g()
    post(r [[maybe_unused]]: true);  // OK
```

#### 事後条件における関数パラメータ
事後条件アサーションの述語内で関数パラメータを使用できる。ただし、配列パラメータをODR使用（One Definition Rule use）することは不適格である。

```cpp
int sum(int arr[], int n)
    post(r: r >= 0);  // OK: 配列パラメータを使用していない

int process(int arr[], int n)
    post(r: arr[0] > 0);  // エラー: 配列パラメータをODR使用
```

### 評価の順番
契約アサーションの評価順序は以下の通りである。

#### 評価のタイミング
- **事前条件アサーション**: 関数パラメータの初期化後、関数本体の評価開始前に評価される。
- **事後条件アサーション**: 戻り値の初期化後、return文によって抜けるスコープのローカル変数の破棄後、ただし**関数パラメータの破棄前**に評価される。
- **アサーション文**: 制御フローがその文に到達した時点で実行される。

コンストラクタとデストラクタでの評価タイミングの詳細については、「コンストラクタとデストラクタの制約」および「レジスタで渡される・返されるオブジェクト」を参照のこと。

#### 複数の契約指定子の評価順序
関数契約アサーションのシーケンス内に複数の事前条件または事後条件アサーションがある場合、それらは宣言された順序で評価される。

```cpp
void f()
    pre(a())
    pre(b())
    post(c())
    post(d())
{
    // 事前条件の評価順: a(), b()
    // 事後条件の評価順: c(), d()
}
```

#### 戻り値のコピーとシーケンス
関数の戻り値の型がレジスタで渡される資格がある場合、コンパイラは戻り値オブジェクトの追加のトリビアルなコピーを作成することが許可されており、事後条件アサーションはそれらのコピーを参照する可能性がある。ただし、これらのコピーは事後条件アサーションの評価と順序付けられて行われなければならない。

したがって、すべての契約アサーションがチェックセマンティクスで正確に1回評価されるようにプログラムがビルドされている場合、以下の例では、`r`が同じオブジェクトを参照するかどうかに関わらず、両方の事後条件アサーションはtrueと評価されなければならない。

```cpp
int f()
    post(r: ++const_cast<int&>(r) == 1)
    post(r: ++const_cast<int&>(r) == 2)
{
    return 0;
}
```

#### 述語の評価
契約アサーションの述語式が評価されるとき、それは`bool`に文脈的に変換される。述語式は完全式（full expression）であるため、述語の評価中に作成された一時オブジェクトは、その評価が完了したときに破棄される。

### 契約の評価モード
各契約アサーションの個別の評価は、特定の評価セマンティクスで実行される。提案されている4つの評価セマンティクスは以下の通りである。

#### ignore（無視）
`ignore`セマンティクスは何も行わない。契約述語は評価されず、副作用も発生しない。これは非チェックセマンティクスである。

#### observe（観察）
`observe`セマンティクスは述語を評価して契約違反を識別する。契約違反が発生した場合、契約違反ハンドラを呼び出す。ハンドラが正常に戻ると、プログラムの実行は続行される。これはチェックセマンティクスである。

#### enforce（強制）
`enforce`セマンティクスは述語を評価して契約違反を識別する。契約違反が発生した場合、契約違反ハンドラを呼び出す。ハンドラが正常に戻ると、プログラムは実装定義の方法で終了する（通常は`std::terminate()`を呼び出すか、類似の方法）。これはチェックセマンティクスであり、終了セマンティクスでもある。

#### quick-enforce（高速強制）
`quick-enforce`セマンティクスは述語を評価して契約違反を識別する。契約違反が発生した場合、契約違反ハンドラを呼び出さずに、即座にプログラムを実装定義の方法で終了する。これはチェックセマンティクスであり、終了セマンティクスでもある。`quick-enforce`は、契約違反ハンドラのオーバーヘッドを避けるため、パフォーマンスが重要な状況で有用である。

#### 評価セマンティクスの選択
契約アサーションの個別の評価に対してどの評価セマンティクスが使用されるかを選択するメカニズムは実装定義である。コンパイル時オプション、実行時設定、またはその組み合わせで指定できる。

GCCでの例：
```bash
g++ -std=c++26 -fcontracts -fcontract-semantic=observe main.cpp
```

#### 契約述語のチェック
チェックセマンティクス（`observe`、`enforce`、`quick-enforce`）では、述語が評価され、`bool`に文脈変換される。述語が`true`に評価されると、契約違反は識別されない。述語が`false`に評価されるか、述語の評価が例外で終了すると、契約違反が識別される。

述語の評価がスタックを通じて制御を返さない他の結果（終了、無限ループ、`longjmp`の呼び出しなど）が発生した場合、他のC++式の評価時と同様に処理される。

#### 省略、重複、順次評価
実装は、契約アサーションの評価を省略、重複、または特定の順序で実行できる。ただし、副作用が正常に戻る場合にのみ省略できる。この柔軟性により、実装は最適化の機会を持つ。

#### 述語の副作用
契約述語に副作用があることは推奨されないが、完全に禁止されているわけではない。述語に破壊的な副作用（プログラムの正当性に影響を与える副作用）がある場合、その動作は設計原則に違反する。ただし、ロギングやデバッグ目的の非破壊的な副作用は許可される。

#### 観察可能なチェックポイント
契約アサーションの評価は、観察可能なチェックポイントである。これは、コンパイラが契約アサーションの評価の前後でメモリアクセスの並べ替えを行わないことを意味する。

#### コルーチンのサポート
コルーチンには契約指定子を適用できる。事前条件アサーションはコルーチンの引数が初期化された後に評価され、事後条件アサーションはコルーチンが`co_return`で終了したときに評価される。

#### 定数評価
契約アサーションは定数評価中にも評価できる。定数評価中、契約違反ハンドラは呼び出されない。代わりに、チェックセマンティクスで契約違反が識別されると、定数評価は失敗する。

### 契約違反ハンドラ

#### ハンドラの定義
契約違反ハンドラは、ユーザーがリンク時にカスタム定義できる関数である。ハンドラの署名は以下の通り：

```cpp
void handle_contract_violation(const std::contracts::contract_violation& violation);
```

この関数を定義することで、デフォルトの契約違反ハンドラをオーバーライドできる。

#### contract_violation情報
`std::contracts::contract_violation`オブジェクトは、契約違反に関する以下の情報を提供する：

- **違反の種類** (`assertion_kind`): 事前条件、事後条件、またはアサーション文のいずれか
- **評価セマンティクス** (`evaluation_semantic`): 違反を識別した評価セマンティクス
- **検出モード** (`detection_mode`): 契約違反がどのように検出されたか（述語が`false`に評価されたか、例外が発生したか）
- **ソースロケーション** (`location`): 違反した契約アサーションのソースファイル名、行番号、関数名
- **終了判定** (`is_terminating`): この違反後にプログラムが終了するかどうか
- **評価例外** (`evaluation_exception`): 述語の評価中に例外が発生した場合、その例外オブジェクトへのアクセス

#### ハンドラの動作
契約違反が識別されると、`observe`または`enforce`セマンティクスの場合、契約違反ハンドラが呼び出される：

1. **observeセマンティクス**: ハンドラが正常に戻ると、プログラムの実行は続行される。
2. **enforceセマンティクス**: ハンドラが正常に戻ると、プログラムは実装定義の方法で終了する。
3. **quick-enforceセマンティクス**: ハンドラは呼び出されず、即座にプログラムが終了する。

#### デフォルトハンドラ
ユーザーがカスタムハンドラを定義しない場合、実装が提供するデフォルトハンドラが使用される。デフォルトハンドラは、標準エラー出力に診断メッセージを出力することが期待される。

#### ハンドラ内での契約違反
契約違反ハンドラの実行中に別の契約違反が発生した場合（再帰的契約違反）、動作は実装定義である。通常は、無限再帰を避けるために即座にプログラムを終了する。

#### 例外を投げるハンドラ
契約違反ハンドラから例外を投げることは許可されているが、推奨されない。ハンドラが例外で終了した場合、`std::terminate()`が呼び出される。

### 標準ライブラリAPI

#### &lt;contracts&gt;ヘッダー
C++26では、契約プログラミングをサポートするために`<contracts>`ヘッダーが導入される。このヘッダーには以下の型と関数が含まれる。

#### 列挙型

##### assertion_kind
契約アサーションの種類を表す列挙型：

```cpp
namespace std::contracts {
    enum class assertion_kind {
        precondition,   // 事前条件アサーション
        postcondition,  // 事後条件アサーション
        assertion       // アサーション文
    };
}
```

##### evaluation_semantic
契約アサーションの評価セマンティクスを表す列挙型：

```cpp
namespace std::contracts {
    enum class evaluation_semantic {
        ignore,         // 無視
        observe,        // 観察
        enforce,        // 強制
        quick_enforce   // 高速強制
    };
}
```

##### detection_mode
契約違反がどのように検出されたかを表す列挙型：

```cpp
namespace std::contracts {
    enum class detection_mode {
        predicate_false,     // 述語がfalseに評価された
        evaluation_exception // 述語の評価中に例外が発生
    };
}
```

#### contract_violationクラス
契約違反に関する情報を提供するクラス：

```cpp
namespace std::contracts {
    class contract_violation {
    public:
        assertion_kind kind() const noexcept;
        evaluation_semantic semantic() const noexcept;
        detection_mode detection() const noexcept;
        source_location location() const noexcept;
        string_view comment() const noexcept;
        bool is_terminating() const noexcept;
        exception_ptr evaluation_exception() const noexcept;
    };
}
```

主なメンバ関数：
- `kind()`: 違反した契約アサーションの種類を返す
- `semantic()`: 使用された評価セマンティクスを返す
- `detection()`: 違反の検出方法を返す
- `location()`: 契約アサーションのソースロケーションを返す
- `comment()`: ベンダー固有のコメント文字列を返す
- `is_terminating()`: 違反後にプログラムが終了するかどうかを返す
- `evaluation_exception()`: 述語の評価中に例外が発生した場合、その例外への`exception_ptr`を返す

#### invoke_default_contract_violation_handler関数
デフォルトの契約違反ハンドラを明示的に呼び出すための関数：

```cpp
namespace std::contracts {
    void invoke_default_contract_violation_handler(
        const contract_violation& violation);
}
```

この関数は、カスタムハンドラ内でデフォルトの動作を呼び出したい場合に有用である。

### 使用上の注意
以下の操作には注意が必要である。

#### 副作用
契約述語内で副作用を持つ式を記述することは可能だが、推奨されない。破壊的な副作用（グローバル変数の変更、`volatile`変数への参照など）は避けるべきである。ただし、ロギングなどの非破壊的な副作用は許可される。

```cpp
// 推奨されない例
int global_counter = 0;
void f(int x) pre(++global_counter > 0);  // 副作用あり

// 許容される例（デバッグ目的）
void g(int x) pre(log_value(x), x > 0);  // ロギングは許容
```

#### 例外
契約述語内で例外が送出されると、契約違反として扱われる。`observe`または`enforce`セマンティクスの場合、契約違反ハンドラが呼び出され、その後の動作はセマンティクスに依存する。

```cpp
bool might_throw(int x);

void f(int x) pre(might_throw(x));  // 例外発生時は契約違反
```

#### 特殊メンバ関数
`= default`または`= delete`で定義された特殊メンバ関数に契約指定子を適用すると、プログラムは不適格となる。通常のコンストラクタ、デストラクタ、およびメンバ関数には契約を適用できる。

#### assert マクロとの違い
契約プログラミング機能と従来の`assert`マクロには以下の違いがある：

- **キーワード vs マクロ**: `contract_assert`はキーワードであり、`assert`はマクロである
- **評価制御**: 契約の評価セマンティクスは実装定義の方法で選択されるが、`assert`は`NDEBUG`マクロの有無で制御される
- **事後条件**: 契約プログラミングは事後条件を簡潔に記述できるが、`assert`マクロでは困難
- **標準化**: 契約プログラミングはC++標準の一部であり、`assert`はCから継承されたマクロである

## 例

### 基本的な使用例

```cpp example
#include <contracts>
#include <iostream>

// 事前条件と事後条件を持つ関数
int safe_division(int numerator, int denominator)
    pre(denominator != 0)
    post(result: result * denominator == numerator)
{
    return numerator / denominator;
}

// 複数の契約条件
class BankAccount {
    double balance = 0.0;

public:
    void deposit(double amount)
        pre(amount > 0)
        post(balance >= old_balance)  // 注: old値の参照はC++26では未サポート
    {
        balance += amount;
    }

    void withdraw(double amount)
        pre(amount > 0)
        pre(amount <= balance)  // 複数の事前条件
        post(balance >= 0)
    {
        contract_assert(balance >= amount);  // アサーション文
        balance -= amount;
    }

    double get_balance() const
        post(result: result >= 0)
    {
        return balance;
    }
};

// ラムダ式での使用
auto lambda_with_contract = [](int x)
    pre(x > 0)
    post(r: r > x)
{
    return x + 1;
};

int main() {
    // 正常な使用
    int result = safe_division(10, 2);  // OK: result = 5
    std::cout << result << '\n';

    BankAccount account;
    account.deposit(100.0);   // OK
    account.withdraw(50.0);   // OK

    // 契約違反の例（実行時に検出される）
    // safe_division(10, 0);  // 事前条件違反
    // account.withdraw(200.0);  // 事前条件違反

    auto value = lambda_with_contract(5);  // OK: value = 6

    return 0;
}
```

### カスタム契約違反ハンドラの例

```cpp example
#include <contracts>
#include <iostream>
#include <cstdlib>

// カスタム契約違反ハンドラの定義
void handle_contract_violation(const std::contracts::contract_violation& v) {
    std::cerr << "契約違反が発生しました:\n";
    std::cerr << "  種類: ";
    switch (v.kind()) {
        case std::contracts::assertion_kind::precondition:
            std::cerr << "事前条件\n";
            break;
        case std::contracts::assertion_kind::postcondition:
            std::cerr << "事後条件\n";
            break;
        case std::contracts::assertion_kind::assertion:
            std::cerr << "アサーション\n";
            break;
    }

    std::cerr << "  場所: " << v.location().file_name()
              << ":" << v.location().line() << '\n';
    std::cerr << "  関数: " << v.location().function_name() << '\n';

    if (v.is_terminating()) {
        std::cerr << "プログラムを終了します。\n";
    }

    // デフォルトハンドラも呼び出す
    std::contracts::invoke_default_contract_violation_handler(v);
}

int process(int x)
    pre(x > 0)
    post(r: r > x)
{
    return x + 1;
}

int main() {
    // 契約違反が発生すると、カスタムハンドラが呼び出される
    // process(-1);  // 事前条件違反

    return 0;
}
```

### テンプレート関数での使用例

```cpp example
#include <contracts>
#include <concepts>
#include <vector>

template<std::integral T>
T increment(T value)
    pre(value < std::numeric_limits<T>::max())
    post(result: result == value + 1)
{
    return value + 1;
}

template<typename T>
class Stack {
    std::vector<T> data;

public:
    void push(const T& item)
        post(size() == old_size + 1)  // 注: old値の参照はC++26では未サポート
    {
        data.push_back(item);
    }

    T pop()
        pre(!empty())
        post(size() == old_size - 1)  // 注: old値の参照はC++26では未サポート
    {
        T value = data.back();
        data.pop_back();
        return value;
    }

    bool empty() const
        post(result: result == (size() == 0))
    {
        return data.empty();
    }

    std::size_t size() const
        post(result: result <= data.capacity())
    {
        return data.size();
    }
};

int main() {
    auto value = increment(42);  // OK

    Stack<int> stack;
    stack.push(10);
    stack.push(20);
    int top = stack.pop();  // OK: top = 20

    return 0;
}
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++ 将来 契約に基づくプログラミング](/lang/future/contract-based_programming.md)
- [`<contracts>`ヘッダー](/reference/contracts.md)
- [`std::contracts::contract_violation`](/reference/contracts/contract_violation.md)
- [`std::contracts::assertion_kind`](/reference/contracts/assertion_kind.md)
- [`std::contracts::evaluation_semantic`](/reference/contracts/evaluation_semantic.md)
- [`std::contracts::detection_mode`](/reference/contracts/detection_mode.md)


## 参照
- [P2900R14 `Contracts for C++`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
