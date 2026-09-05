# 未定義動作とIFNDRの一覧を規格の付録に追加 [P3596R3]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
未定義動作の規定や、不適格だが診断が要求されない (ill-formed, no diagnostic required、IFNDR) 規則は、規格の本文全体に散在しており、その全体像を把握することが難しかった。

C++29では、これらをすべて列挙する2つの付録が規格に追加される。

- Core undefined behavior : コア言語の規定で「動作は未定義」と明示されているすべてのケース（80項目）
- Ill-formed, no diagnostic required : 「診断は要求されない」とされているすべての規則（45項目）

各項目は、次の要素で構成される。

- 安定した名前（例: `expr.expr.eval`＝算術式の評価が未定義動作であるケース、`basic.compound.invalid.pointer`＝無効なポインタ値の間接参照）
- 本文の規定への相互参照（本文の該当箇所から付録の項目へもリンクされる）
- 状況の要約
- コード例

この付録は参考情報 (informative) であり、規範ではない。付録の追加によって言語の動作が変わることはなく、プログラムの正しさの調査や、処理系・検査ツールの網羅性の確認などに利用できるリファレンスを提供するものである。

また、各項目に与えられた安定した名前は、個々の未定義動作の緩和・削減を検討する取り組み（P3100など）において、問題を特定する共通の語彙としても使われる。


## 仕様
- 未定義動作の付録が対象とするのは、コア言語の規定（字句規則からプリプロセッサまで）で「動作は未定義」などの言い回しによって明示的に規定されている未定義動作である
    - 規格が動作を定義していないことによる暗黙の未定義動作は対象外である
    - 標準ライブラリの規定による未定義動作も対象外である
- IFNDRの付録が対象とするのは、「診断は要求されない」などの言い回しによって明示的に規定されている規則である
- どちらの付録も、本文の章構成と対応する節に分けて項目を列挙する

### 未定義動作の一覧

| 分類 | 名前 | 説明 |
|------|------|------|
| 基本 | `intro.object.implicit.create` | 暗黙的なオブジェクト生成で、プログラムの動作が定義されることになるオブジェクトの集合が存在しない |
| 基本 | `intro.object.implicit.pointer` | 暗黙的なオブジェクト生成後に、適切なオブジェクトへのポインタを生成できない |
| 基本 | `basic.align.object.alignment` | 型のアライメント要求を満たさない記憶域にオブジェクトを生成する |
| 基本 | `lifetime.outside.pointer.delete` | 生存期間外のオブジェクトへのポインタを、非トリビアルなデストラクタを持つクラス型に対するdelete式のオペランドに使用する |
| 基本 | `lifetime.outside.pointer.member` | 生存期間外のオブジェクトへのポインタで、メンバ変数へアクセスするか非静的メンバ関数を呼び出す |
| 基本 | `lifetime.outside.pointer.virtual` | 生存期間外のオブジェクトへのポインタを、仮想基底クラスへのポインタへ暗黙変換する |
| 基本 | `lifetime.outside.pointer.dynamic.cast` | 生存期間外のオブジェクトへのポインタを`dynamic_cast`のオペランドに使用する |
| 基本 | `lifetime.outside.glvalue.access` | 生存期間外のオブジェクトを参照するglvalueで、そのオブジェクトへアクセスする |
| 基本 | `lifetime.outside.glvalue.member` | 生存期間外のオブジェクトを参照するglvalueで、非静的メンバ関数を呼び出す |
| 基本 | `lifetime.outside.glvalue.virtual` | 生存期間外のオブジェクトを参照するglvalueを、仮想基底クラスへの参照に束縛する |
| 基本 | `lifetime.outside.glvalue.dynamic.cast` | 生存期間外のオブジェクトを参照するglvalueを、`dynamic_cast`または`typeid`のオペランドに使用する |
| 基本 | `original.type.implicit.destructor` | 記憶域を占めるオブジェクトの型が、その記憶域の元の型と異なる状態で、非トリビアルな暗黙のデストラクタ呼び出しが行われる |
| 基本 | `creating.within.const.complete.obj` | `const`な完全オブジェクトが占める（または生存期間終了前に占めていた）記憶域に、新しいオブジェクトを生成する |
| 基本 | `basic.indet.value` | 評価の結果が不定値となる（エラー値の場合を除く） |
| 基本 | `basic.stc.alloc.dealloc.constraint` | 確保関数・解放関数の動作が、規定された意味論的制約を満たさない |
| 基本 | `basic.stc.alloc.zero.dereference` | サイズ0で確保関数を呼び出して返されたポインタを間接参照する |
| 基本 | `basic.compound.invalid.pointer` | 解放済みの記憶域を参照するポインタ値を、間接参照するか解放関数へ渡す |
| 基本 | `intro.execution.unsequenced.modification` | 同じメモリ位置への副作用が、同じメモリ位置への別の副作用や値の計算と順序付けられていない |
| 基本 | `intro.races.data` | データ競合（一方が非アトミックで、互いに前後して発生しない、並行する競合アクセス） |
| 基本 | `intro.progress.stops` | 終了していない実行スレッドが、実行ステップを進めなくなる |
| 基本 | `basic.start.main.exit.during.destruction` | 静的・スレッド記憶域期間のオブジェクトの破棄中に`std::exit()`を呼び出す |
| 基本 | `basic.start.term.use.after.destruction` | 破棄済みの静的・スレッドローカルなブロックスコープオブジェクトを持つ関数を、静的・スレッド記憶域期間のオブジェクトの破棄中に呼び出す |
| 式 | `expr.expr.eval` | 算術式の結果が数学的に定義されないか、その型で表現できない（符号付き整数のオーバーフローなど） |
| 式 | `expr.basic.lvalue.strict.aliasing.violation` | オブジェクトを、その動的な型と類似しない型のglvalueを通してアクセスする（strict aliasing違反） |
| 式 | `expr.basic.lvalue.union.initialization` | 共用体のdefault定義されたコピー・ムーブ操作を、生存期間内の類似した型のオブジェクトではない引数で呼び出す |
| 式 | `expr.type.reference.lifetime` | 同じオブジェクトを指すポインタの同等の使用が無効となる状況で、参照を評価する |
| 式 | `conv.lval.valid.representation` | 値表現がその型として妥当ではないオブジェクトを、lvalueからrvalueへ変換する |
| 式 | `conv.double.out.of.range` | 浮動小数点数の値を、その値を表現できない浮動小数点型へ変換する |
| 式 | `conv.fpint.float.not.represented` | 浮動小数点数から整数型への変換で、値が変換先の型で表現できない |
| 式 | `conv.fpint.int.not.represented` | 整数型・スコープなし列挙型から浮動小数点型への変換で、値が変換先の型で表現できない |
| 式 | `conv.ptr.virtual.base` | 生存期間内の有効なオブジェクトを指していない派生クラスへのポインタを、仮想基底クラスへのポインタへ変換する |
| 式 | `conv.member.missing.member` | 基底クラスのメンバへのポインタを、そのメンバを含むことができない派生クラスのメンバへのポインタへ変換する |
| 式 | `expr.call.different.type` | 関数を、その定義の関数型と呼び出し互換ではない関数型の式を通して呼び出す |
| 式 | `expr.ref.member.not.similar` | クラスメンバアクセス`E1.E2`で、`E1`が参照するオブジェクトの型が式`E1`の型と類似しない |
| 式 | `expr.dynamic.cast.pointer.lifetime` | 異なる型のオブジェクトや生存期間外のオブジェクトを指す非ヌルポインタに対して、`dynamic_cast`を評価する |
| 式 | `expr.dynamic.cast.glvalue.lifetime` | 類似しない型のオブジェクトや生存期間外のオブジェクトを参照するglvalueに対して、`dynamic_cast`を評価する |
| 式 | `expr.static.cast.base.class` | 基底クラス型のglvalueを、実際のオブジェクトが属さない派生クラスへの参照へ`static_cast`する |
| 式 | `expr.static.cast.enum.outside.range` | 固定の基底型を持たない列挙型への変換で、元の値が列挙の値の範囲外である |
| 式 | `expr.static.cast.fp.outside.range` | 浮動小数点数の明示的な変換で、値が変換先の型の範囲外である |
| 式 | `expr.static.cast.downcast.wrong.derived.type` | その位置に派生クラスのオブジェクトが存在しないのに、基底クラスへのポインタを派生クラスへのポインタへ`static_cast`する |
| 式 | `expr.static.cast.does.not.contain.original.member` | 元のメンバを含まないクラスのメンバへのポインタへ`static_cast`する |
| 式 | `expr.unary.dereference` | オブジェクトも関数も指していないポインタを間接参照する |
| 式 | `expr.new.non.allocating.null` | 非確保形式（placement形式）の確保関数がヌルポインタを返す |
| 式 | `expr.delete.mismatch` | 単一オブジェクトのnew式の結果を、配列版の`delete[]`で解放する |
| 式 | `expr.delete.array.mismatch` | 配列のnew式の結果を、単一オブジェクト版の`delete`で解放する |
| 式 | `expr.delete.dynamic.type.differ` | delete式で、削除するオブジェクトの静的な型が動的な型と異なり、基底クラスかつ仮想デストラクタを持つという要件を満たさない |
| 式 | `expr.delete.dynamic.array.dynamic.type.differ` | 配列のdelete式で、削除するオブジェクトの動的な型が静的な型と異なる |
| 式 | `expr.mptr.oper.not.contain.member` | メンバポインタ演算子`E1.*E2`で、`E1`の動的な型が`E2`が参照するメンバを含まない |
| 式 | `expr.mptr.oper.member.func.null` | `.*`式の第2オペランドがヌルメンバポインタ値である |
| 式 | `expr.mul.div.by.zero` | 0による除算・剰余 |
| 式 | `expr.mul.representable.type.result` | 除算・剰余で、商が結果の型で表現できない（`INT_MIN / -1`など） |
| 式 | `expr.add.out.of.bounds` | 配列の範囲外を指すポインタを生成する |
| 式 | `expr.add.sub.diff.pointers` | 同じ配列に属さないポインタ同士を減算する |
| 式 | `expr.add.not.similar` | ポインタの加減算で、ポインタが指す型と配列要素の型が類似しない |
| 式 | `expr.shift.neg.and.width` | 負の量、または型のビット幅以上の量によるシフト |
| 式 | `expr.assign.overlap` | 代入で、転送元と転送先の記憶域が重なる |
| 文 | `stmt.return.flow.off` | 戻り値の型が`void`ではない関数（`main()`とコルーチンを除く）の末尾に到達する |
| 文 | `stmt.return.coroutine.flow.off` | `void`を返さないコルーチンの本体の末尾に到達する |
| 文 | `stmt.dcl.local.static.init.recursive` | ブロックスコープの静的変数の初期化中に、その宣言へ再帰的に制御が入る |
| 宣言 | `dcl.type.cv.modify.const.obj` | `const`オブジェクトを生存期間中に変更する |
| 宣言 | `dcl.type.cv.access.volatile` | `volatile`修飾された型で定義されたオブジェクトへ、非`volatile`なglvalueを通してアクセスする |
| 宣言 | `dcl.ref.incompatible.function` | 関数への参照を、参照の型と呼び出し互換ではない関数で初期化する |
| 宣言 | `dcl.ref.incompatible.type` | オブジェクトへの参照を、参照の型を通してアクセスできない値で初期化する |
| 宣言 | `dcl.ref.uninitialized.reference` | 初期化される前の参照を評価する |
| 宣言 | `dcl.fct.def.coroutine.resume.not.suspended` | 中断していないコルーチンの再開メンバ関数を呼び出す |
| 宣言 | `dcl.fct.def.coroutine.destroy.not.suspended` | 中断していないコルーチンの`destroy()`を呼び出す |
| 宣言 | `dcl.attr.assume.false` | `assume`属性の式が、その地点で`true`に評価されないことになる |
| 宣言 | `dcl.attr.noreturn.eventually.returns` | `noreturn`属性付きで宣言された関数が返る |
| クラス | `class.dtor.no.longer.exists` | 生存期間が終了したオブジェクトに対して、デストラクタを呼び出す |
| クラス | `class.abstract.pure.virtual` | 抽象クラスのコンストラクタ・デストラクタから、純粋仮想関数を呼び出す |
| クラス | `class.base.init.mem.fun` | 基底クラスのすべてのメンバ初期化子が完了する前に、メンバ関数を呼び出す |
| クラス | `class.cdtor.before.ctor` | 非トリビアルなコンストラクタの実行開始前に、オブジェクトのメンバや基底クラスを参照する |
| クラス | `class.cdtor.after.dtor` | 非トリビアルなデストラクタの実行完了後に、オブジェクトのメンバや基底クラスを参照する |
| クラス | `class.cdtor.convert.pointer` | 構築開始前・破棄完了後のオブジェクトへのポインタを、基底クラスへのポインタへ変換する |
| クラス | `class.cdtor.form.pointer` | 構築開始前・破棄完了後のオブジェクトの、直接の非静的メンバへのポインタを作る |
| クラス | `class.cdtor.virtual.not.x` | 構築・破棄中の仮想関数呼び出しで、呼び出し対象のオブジェクトが構築・破棄中のオブジェクトやその部分オブジェクトではない |
| クラス | `class.cdtor.typeid` | `typeid`のオペランドが構築・破棄中のオブジェクトを参照し、オペランドの静的な型がそのクラスやその基底クラスではない |
| クラス | `class.cdtor.dynamic.cast` | `dynamic_cast`のオペランドが構築・破棄中のオブジェクトを参照し、オペランドの静的な型がそのクラスやその基底クラスではない |
| テンプレート | `temp.inst.inf.recursion` | テンプレートのインスタンス化が無限に再帰する |
| 例外 | `except.handle.handler.ctor.dtor` | コンストラクタ・デストラクタの関数tryブロックのハンドラで、そのオブジェクトのメンバや基底クラスを参照する |

### IFNDRの一覧

| 分類 | 名前 | 説明 |
|------|------|------|
| 字句 | `lex.name.reserved` | C++処理系のために予約された識別子を使用する |
| 基本 | `basic.link.consistent.types` | 互いに到達可能ではない、同じ実体の異なる種類での複数の宣言がある |
| 基本 | `basic.def.odr.minimum.one.def` | 破棄されない文からodr使用される関数・変数に定義がない |
| 基本 | `basic.def.odr.injected.match` | ある翻訳単位でリフレクションの注入された宣言によって定義した実体が、別の翻訳単位の定義と要件を満たさない |
| 基本 | `basic.def.odr.maximum.one.def` | 非インライン・非テンプレートの関数・変数が、異なる翻訳単位で複数回定義される |
| 基本 | `basic.def.odr.definition.matches` | 異なる翻訳単位の定義同士が一致しない（ODR違反） |
| 基本 | `basic.def.odr.unnamed.enum.same.type` | 同じスコープに、先頭の列挙子名が同じでリンケージ用のtypedef名を持たない複数の無名列挙型の定義がある |
| 基本 | `basic.contract.vastart.contract.predicate` | 契約アサーションの述語の中で`va_start`を使用する |
| 基本 | `basic.contract.handler.replacing.nonreplaceable` | 契約違反ハンドラを置き換えられない処理系で、置き換え関数となりうる関数を宣言する |
| 基本 | `class.member.lookup.name.refers.diff.decl` | クラス内で使用した名前が、クラスの完成したスコープで再評価すると異なる宣言を参照する |
| 式 | `expr.prim.req.always.sub.fail` | requires式の要件へのテンプレート引数の置換が、常に置換失敗となる |
| 文 | `stmt.ambig.bound.diff.parse` | 構文解析中のテンプレートパラメータ内の名前が、試行的な構文解析時と異なって束縛される |
| 宣言 | `dcl.constinit.specifier.not.reachable` | `constinit`指定子の有無が、互いに到達可能ではない宣言間で一致しない |
| 宣言 | `dcl.inline.missing.on.definition` | 外部・モジュールリンケージを持つinline関数・変数で、定義域の終端から到達可能なinline宣言がない |
| 宣言 | `dcl.fct.default.inline.same.defaults` | 複数の翻訳単位で定義されるインライン関数のデフォルト引数の集合が、翻訳単位の終端で異なる |
| 宣言 | `dcl.contract.func.mismatched.contract.specifiers` | 互いに到達可能ではない関数の最初の宣言同士で、契約指定子が等価ではない |
| 宣言 | `dcl.fct.def.replace.bad.replacement` | 置き換え可能関数の宣言が、要求される形（非インライン・C++言語リンケージ・戻り値の型など）を満たさない |
| 宣言 | `dcl.link.mismatched.language.linkage` | 互いに到達可能ではない宣言同士で、言語リンケージが一致しない |
| 宣言 | `dcl.align.diff.translation.units` | 実体のアライメント指定子が、翻訳単位間で異なる |
| 宣言 | `dcl.attr.indet.mismatched.declarations` | 関数の最初の宣言同士で、パラメータの`indeterminate`属性の使用が一致しない |
| 宣言 | `dcl.attr.noreturn.trans.unit.mismatch` | `noreturn`属性の有無が、翻訳単位間で一致しない |
| モジュール | `module.unit.reserved.identifiers` | モジュール名に、`std`＋数字で始まる識別子や予約識別子を使用する |
| モジュール | `module.unit.named.module.no.partition` | 名前付きモジュールに、複数のプライマリモジュールインタフェース単位がある |
| モジュール | `module.unit.unexported.module.partition` | モジュールインタフェース単位であるパーティションが、プライマリモジュールインタフェース単位からエクスポートされていない |
| モジュール | `module.private.frag.other.module.units` | プライベートモジュールフラグメントを持つモジュールに、ほかのモジュール単位がある |
| クラス | `class.base.init.delegate.itself` | コンストラクタが、直接または間接に自分自身へ委譲する |
| クラス | `class.virtual.pure.or.defined` | 純粋ではない仮想関数に定義がない |
| オーバーロード | `over.literal.reserved` | 将来の標準化のために予約されたリテラルサフィックス識別子で、リテラル演算子を宣言する |
| テンプレート | `temp.pre.reach.def` | 暗黙的にインスタンス化されるテンプレートの定義が、すべての定義域の終端から到達可能ではなく、明示的インスタンス化もされていない |
| テンプレート | `temp.arg.template.sat.constraints` | テンプレートテンプレートパラメータによるインスタンス化で、到達可能であれば選択されたはずの部分特殊化が到達可能ではない |
| テンプレート | `temp.constr.atomic.equiv.but.not.equiv` | プログラムの妥当性・意味が、機能的に等価だが等価ではない2つのアトミック制約に依存する |
| テンプレート | `temp.constr.atomic.sat.result.diff` | 同一のアトミック制約とテンプレート引数に対する充足の結果が、プログラム中の異なる地点で異なる |
| テンプレート | `temp.constr.normal.invalid` | 制約の正規化中の置換が、無効な型や式を生成する |
| テンプレート | `temp.spec.partial.general.partial.reachable` | インスタンス化で使用されたはずの部分特殊化が、テンプレートの特殊化の使用箇所から到達可能ではない |
| テンプレート | `temp.over.link.equiv.not.equiv` | プログラムの妥当性・意味が、機能的に等価だが等価ではない2つの構成要素に依存する |
| テンプレート | `temp.res.general.default.but.not.found` | インスタンス化地点から到達可能だが名前探索では見つからない宣言のデフォルト引数・デフォルトテンプレート引数を考慮すると、プログラムの妥当性・意味が変わる |
| テンプレート | `temp.point.diff.pt.diff.meaning` | 2つの異なるインスタンス化地点が、ODRに従うとテンプレートの特殊化へ異なる意味を与える |
| テンプレート | `temp.dep.candidate.different.lookup.different` | 全翻訳単位の関連名前空間の外部リンケージを持つ全関数宣言を考慮すると、依存呼び出しが不適格になるかより良い一致が見つかる |
| テンプレート | `temp.explicit.decl.implicit.inst` | 明示的インスタンス化の宣言の対象であり暗黙的インスタンス化も起こる使い方をされている実体が、プログラム中のどこでも明示的インスタンス化の定義の対象になっていない |
| テンプレート | `temp.expl.spec.unreachable.declaration` | 暗黙的インスタンス化が起こる箇所から、一致したはずの明示的特殊化が到達可能ではない |
| テンプレート | `temp.expl.spec.missing.definition` | 明示的特殊化が宣言されているが、その定義が提供されていない |
| テンプレート | `temp.deduct.general.diff.order` | 同じ関数テンプレートの異なる宣言への置換で、テンプレートのインスタンス化が異なる順序で起こるか、起こらなくなる |
| プリプロセッサ | `cpp.cond.defined.after.macro` | マクロの展開が`defined`という前処理トークンを生成する |
| プリプロセッサ | `cpp.cond.defined.malformed` | `defined`単項演算子を、規定された文法の形に一致しない形で使用する |
| プリプロセッサ | `cpp.include.malformed.headername` | `#include`指令の後のトークン列からヘッダ名を構成できない |


## 例
付録に列挙される未定義動作の例:

```cpp
#include <climits>

int main()
{
  int n = INT_MAX;
  int m = n + 1;  // 未定義動作: 算術式の結果が表現可能な値の範囲にない
                  // 付録では expr.expr.eval という名前で列挙される

  int* p = nullptr;
  *p;             // 未定義動作: 無効なポインタ値の間接参照
                  // 付録では basic.compound.invalid.pointer という名前で列挙される
}
```


## この機能が必要になった背景・経緯
C++のすべての未定義動作とIFNDRを一覧化する作業は、以前から有用と認識されており、P1705R1による調査の試みや、その成果を規格自体の付録として正式化する提案（P2234R0・P3075R0）が行われてきた。この付録の文言は、C++ワーキングドラフトのブランチとして共同で開発され、C++29のドラフトへ取り込まれた。

未定義動作の網羅的な一覧は、安全性への関心の高まりを受けて未定義動作を分類し緩和策を検討するP3100のような提案の基礎資料にもなっており、規格自体が一覧を保守することで、こうした取り組みが参照できる安定した共通語彙が確立された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 未初期化変数の読み取りをエラー性動作とする (`[[indeterminate]]`属性)](/lang/cpp26/erroneous_behavior_for_uninitialized_reads.md)
- [C++29 浮動小数点演算のオーバーフローと無限大・NaNの扱いを明確化](/lang/cpp29/clarify_the_behavior_of_floating-point_overflow.md)


## 参照
- [P3596R3 Undefined Behavior and IFNDR Annexes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3596r3.pdf)
- [P1705R1 Enumerating Core Undefined Behavior](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1705r1.html)
    - コア言語の未定義動作を列挙する初期の調査
- [P3100R2 Undefined and erroneous behaviour is a contract violation](https://wg21.link/p3100)
    - 未定義動作・エラー性動作を契約違反として扱い緩和することを検討する提案
