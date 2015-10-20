#ios_base
* ios[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class ios_base;
}
```

##概要
ios_baseは入出力クラスの基底となるクラスである。すべてのクラスで共通の処理や定数などが定義されている。

##メンバ関数
###構築・破棄・代入

| 名前                                          | 説明           | 対応バージョン |
|-----------------------------------------------|----------------|----------------|
| [`(constructor)`](ios_base/op_constructor.md) | コンストラクタ |                |
| [`(destructor)`](ios_base/op_destructor.md)   | デストラクタ   |                |
| [`operator=`](ios_base/op_assign.md)          | 代入演算子     |                |

なお、コピーコンストラクタとコピー代入演算子はdelete定義されている。
C++03では、delete定義の代わりに`private`で宣言のみされていた。

###書式化

| 名前                                 | 説明                         | 対応バージョン |
|--------------------------------------|------------------------------|----------------|
| [`flags`](ios_base/flags.md)         | 書式フラグの取得・設定       |                |
| [`setf`](ios_base/setf.md)           | 書式フラグの設定             |                |
| [`unsetf`](ios_base/unsetf.md)       | 書式フラグの解除             |                |
| [`precision`](ios_base/precision.md) | 浮動書数点数精度の取得・設定 |                |
| [`width`](ios_base/width.md)         | フィールド幅の取得・設定     |                |

###ロケール

| 名前                           | 説明           | 対応バージョン |
|--------------------------------|----------------|----------------|
| [`imbue`](ios_base/imbue.md)   | ロケールの設定 |                |
| [`getloc`](ios_base/getloc.md) | ロケールの取得 |                |

###記憶域

| 名前                         | 説明                             | 対応バージョン |
|------------------------------|----------------------------------|----------------|
| [`iword`](ios_base/iword.md) | 整数値の記憶域への参照の取得     |                |
| [`pword`](ios_base/pword.md) | ポインタ値の記憶域への参照の取得 |                |

###コールバック

| 名前                                                 | 説明               | 対応バージョン |
|------------------------------------------------------|--------------------|----------------|
| [`register_callback`](ios_base/register_callback.md) | コールバックの登録 |                |

##静的メンバ関数

| 名前                                             | 説明                 | 対応バージョン |
|--------------------------------------------------|----------------------|----------------|
| [`sync_with_stdio`](ios_base/sync_with_stdio.md) | stdioとの同期の設定  |                |
| [`xalloc`](./ios_base/xalloc.md)                 | 私用記憶域を予約する |                |

##メンバ型

| 名前                                                | 説明                                         | 対応バージョン |
|-----------------------------------------------------|----------------------------------------------|----------------|
| [`failure`](ios_base/failure.md)                    | エラー                                       |                |
| [`fmtflags`](ios_base/type-fmtflags.md)             | 書式フラグ                                   |                |
| [`iostate`](ios_base/type-iostate.md)               | 入出力オブジェクトの状態                     |                |
| [`openmode`](ios_base/type-openmode.md)             | ストリームを開く際のモード                   |                |
| [`seekdir`](ios_base/type-seekdir.md)               | シーク時の起点の指定                         |                |
| [`Init`](ios_base/Init.md)                          | 標準入出力オブジェクトの初期化・後処理の管理 |                |
| [`event`](ios_base/type-event.md)                   | コールバックイベントの種類                   |                |
| [`event_callback`](ios_base/type-event_callback.md) | コールバック関数                             |                |

##参照
- [`basic_ios`](./basic_ios.md): ios_baseから派生するクラステンプレート
